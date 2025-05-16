import {launchImageLibrary} from 'react-native-image-picker';

export const uploadImage = async (): Promise<{
  success: boolean;
  data?: {make: string; model: string; year: string};
  error?: string;
  uri?: string;
}> => {
  return new Promise(resolve => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      async response => {
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

        const formData = new FormData();
        formData.append('image', {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || 'upload.jpg',
        });

        try {
          const res = await fetch('http://10.0.2.2:3000/api/claude', {
            method: 'POST',
            body: formData,
          });

          const text = await res.text();

          try {
            const json = JSON.parse(text);

            if (json.success) {
              resolve({
                success: true,
                data: json.result,
                uri: asset.uri,
              });
            } else {
              resolve({success: false, error: 'Invalid response from server'});
            }
          } catch (err) {
            resolve({success: false, error: 'Failed to parse server response'});
          }
        } catch (err) {
          resolve({success: false, error: 'Network error'});
        }
      },
    );
  });
};
