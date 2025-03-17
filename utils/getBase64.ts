import * as FileSystem from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";



export const getBase64FromUri = async (uri: string) => {
  const WIDTH = 300;
  // Resize the image to a specific width (e.g., 300 pixels)
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: WIDTH } }],
    { compress: 1, format: SaveFormat.JPEG }
  );
  const base64Data = await FileSystem.readAsStringAsync(manipResult.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return `data:image/jpeg;base64,${base64Data}`;
};