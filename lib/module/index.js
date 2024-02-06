import { NativeModules, PermissionsAndroid, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-video-trim' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const VideoTrim = NativeModules.VideoTrim ? NativeModules.VideoTrim : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
/**
 * Delete a file
 *
 * @param {string} videoPath: absolute non-empty file path to edit
 * @param {EditorConfig} config: editor configuration
 * @returns {void} A **Promise** which resolves `void`
 */
export async function showEditor(filePath) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!(filePath !== null && filePath !== void 0 && filePath.trim().length)) {
    throw new Error('File path cannot be empty!');
  }
  const {
    saveToPhoto = true
  } = config;
  const outputPath = await VideoTrim.showEditor(filePath, config);
  if (Platform.OS === 'android') {
    if (saveToPhoto) {
      try {
        if (Platform.Version >= 33) {
          // since android 13 it's not needed to request permission for write storage: https://github.com/facebook/react-native/issues/36714#issuecomment-1491338276
          await VideoTrim.saveVideo(outputPath);
          if (config.removeAfterSavedToPhoto) {
            deleteFile(outputPath);
          }
        } else {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
            title: 'Video Trimmer Photos Access Required',
            message: 'Grant access to your Photos to write output Video',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          });
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await VideoTrim.saveVideo(outputPath);
            if (config.removeAfterSavedToPhoto) {
              deleteFile(outputPath);
            }
          } else {
            throw new Error('Photos Library permission denied');
          }
        }
      } catch (err) {
        throw err;
      } finally {
        VideoTrim.hideDialog();
      }
    } else {
      VideoTrim.hideDialog();
    }
  }
}

/**
 * Delete a file
 *
 * @param {string} filePath: absolute non-empty file path to check if editable
 * @returns {Promise} A **Promise** which resolves `true` if editable
 */
export function isValidVideo(filePath) {
  if (!(filePath !== null && filePath !== void 0 && filePath.trim().length)) {
    throw new Error('File path cannot be empty!');
  }
  return VideoTrim.isValidVideo(filePath);
}

/**
 * Clean output files generated at all time
 *
 * @returns {Promise<string[]>} A **Promise** which resolves to array of files
 */
export function listFiles() {
  return VideoTrim.listFiles();
}

/**
 * Clean output files generated at all time
 *
 * @returns {Promise} A **Promise** which resolves to number of deleted files
 */
export function cleanFiles() {
  return VideoTrim.cleanFiles();
}

/**
 * Delete a file
 *
 * @param {string} filePath: absolute non-empty file path to delete
 * @returns {Promise} A **Promise** which resolves `true` if successful
 */
export function deleteFile(filePath) {
  if (!(filePath !== null && filePath !== void 0 && filePath.trim().length)) {
    throw new Error('File path cannot be empty!');
  }
  return VideoTrim.deleteFile(filePath);
}
//# sourceMappingURL=index.js.map