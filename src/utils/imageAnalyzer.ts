import {CarFormResult} from './carFormManager';
import {launchImageLibrary} from 'react-native-image-picker';
import {API_ENDPOINTS} from '../config/env';

interface ImageAnalysisResult {
  success: boolean;
  result?: CarFormResult;
  error?: string;
  uri?: string;
}

export class ImageAnalyzer {
  private static readonly API_ENDPOINT = `${API_ENDPOINTS.CLAUDE}`;
  private static readonly ERROR_MESSAGE =
    "No match detected—but hey, maybe it's a concept car from the future? Try again";

  public static async analyzeFromGallery(): Promise<ImageAnalysisResult> {
    return new Promise(async resolve => {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (response.didCancel) {
        resolve({success: false, error: 'User cancelled image picker'});
        return;
      }

      if (response.errorCode) {
        resolve({
          success: false,
          error: response.errorMessage || 'Unknown error',
        });
        return;
      }

      const asset = response.assets?.[0];
      if (!asset?.uri) {
        resolve({success: false, error: 'No image selected'});
        return;
      }

      const result = await this.analyzeImage(asset.uri);
      resolve({
        ...result,
        uri: asset.uri,
      });
    });
  }

  public static async analyzeFromCamera(
    photoPath: string,
  ): Promise<ImageAnalysisResult> {
    const result = await this.analyzeImage(photoPath);
    return {
      ...result,
      uri: photoPath,
    };
  }

  private static async analyzeImage(
    imagePath: string,
  ): Promise<ImageAnalysisResult> {
    try {
      const formData = this.createFormData(imagePath);
      const response = await this.sendRequest(formData);

      if (!response.ok) {
        return this.createErrorResult();
      }

      const text = await response.text();

      try {
        const json = JSON.parse(text);
        if (json.success && json.result) {
          if (!json.result.make || !json.result.model || !json.result.year) {
            return this.createErrorResult();
          }
          return {
            success: true,
            result: json.result,
          };
        }
      } catch {}

      return this.createErrorResult();
    } catch {
      // Silently handle network errors
      return this.createErrorResult();
    }
  }

  private static createFormData(imagePath: string): FormData {
    const formData = new FormData();
    formData.append('image', {
      uri: `file://${imagePath}`,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    return formData;
  }

  private static async sendRequest(formData: FormData): Promise<Response> {
    return fetch(this.API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });
  }

  private static createErrorResult(): ImageAnalysisResult {
    return {
      success: false,
      error: this.ERROR_MESSAGE,
    };
  }
}
