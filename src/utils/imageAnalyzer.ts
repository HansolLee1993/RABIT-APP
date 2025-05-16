import {CarFormResult} from './carFormManager';

interface ImageAnalysisResult {
  success: boolean;
  result?: CarFormResult;
  error?: string;
}

export class ImageAnalyzer {
  private static readonly API_ENDPOINT = 'http://10.0.2.2:3000/api/claude';
  private static readonly ERROR_MESSAGE =
    "No match detected—but hey, maybe it's a concept car from the future? Try again";

  public static async analyze(photoPath: string): Promise<ImageAnalysisResult> {
    try {
      const formData = this.createFormData(photoPath);
      const response = await this.sendRequest(formData);
      const json = await this.parseResponse(response);

      if (json.success && json.result) {
        if (!json.result.make || !json.result.model || !json.result.year) {
          return this.createErrorResult();
        }
        return {
          success: true,
          result: json.result,
        };
      }

      return this.createErrorResult();
    } catch (error) {
      console.error('Image analysis error:', error);
      return this.createErrorResult();
    }
  }

  private static createFormData(photoPath: string): FormData {
    const formData = new FormData();
    formData.append('image', {
      uri: `file://${photoPath}`,
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

  private static async parseResponse(response: Response): Promise<any> {
    const text = await response.text();
    const json = JSON.parse(text);
    console.log('json', json);
    return json;
  }

  private static createErrorResult(): ImageAnalysisResult {
    return {
      success: false,
      error: this.ERROR_MESSAGE,
    };
  }
}
