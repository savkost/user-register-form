// INTERFACE FOR THE PROFILE IMAGE

// 1. dataGiven: The base64 data of the selected image
// 2. dataAsAFile: The selected image as a File Object (Interface).
// 3. type: The type of the selected image.
export interface ProfileImage {
  dataGiven: string;
  dataAsAFile: File;
  type: string;
}
