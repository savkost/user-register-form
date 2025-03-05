import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileImage} from "../../../../Interfaces/profile-image";
import {HelperService} from "../../../../services/helper.service";

@Component({
  selector: 'app-select-profile-image',
  templateUrl: './select-profile-image.component.html',
  styleUrls: ['./select-profile-image.component.scss'],
  standalone: false
})
export class SelectProfileImageComponent  implements OnInit {

  // INPUTS
  @Input() inputImageIconSelector: string;
  @Input() mainGridBackgroundColor: string;

  // OUTPUTS
  @Output() selectedProfileImage: EventEmitter<ProfileImage> = new EventEmitter();

  // Local Fields
  selectedImageFullData: ProfileImage;
  selectedDefaultImage: string;

  constructor(private http: HttpClient, public helper: HelperService) { }

  ngOnInit() {

    // Set the default image
    this.selectedDefaultImage = 'assets/images/profile/profile.png';

    // Load the base64 data of the default selected image
    this.http.get('assets/images/profile/profile.png', { responseType: 'blob' }).subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        let base64data = reader.result;

        // Set the default selected image data
        this.selectedImageFullData = {
          dataGiven: base64data.toString(),
          dataAsAFile: null,
          type: 'png'
        };

        // Console the full data of the default selected image
        this.helper.consoleHandler('Full Data Initial Image: ', this.selectedImageFullData);

        // Emit the selected profile image
        this.selectedProfileImage.emit(this.selectedImageFullData);
      };

      reader.readAsDataURL(res);
      this.helper.consoleHandler(res);
    });
  }

  /**
   * This method opens the image selector for the profile
   * @param stringReferenced
   */
  openImageSelector(stringReferenced: string){

    // Open the file system to select the image
    document.getElementById(stringReferenced).click();
  }

  /**
   * This method opens the file system and selects a file
   * @param eventImage
   */
  async onImagePicked(eventImage: Event){

    this.helper.consoleHandler('Image Picked: ', eventImage);

    let fileElem = (eventImage.target as HTMLInputElement);
    let file: File;

    if (this.helper.checkUndefinedNull(fileElem.files) && fileElem.files.length > 0){
      this.helper.consoleHandler('Image Selected: ', fileElem.files);

      file = fileElem.files[0];
      this.helper.consoleHandler('Image: ', file);

      let mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.helper.consoleHandler('Only images are supported.');
        return;
      }

      // Set the image preview now
      let imagePreview = '';
      const reader = new FileReader();
      reader.onload = async () => {
        if (this.helper.checkUndefinedNull(reader.result)){
          imagePreview = reader.result.toString();

          // Check here for the file size
          if (file.size > 15728640){

            // 15Mb
            // Stop the upload => MAXIMUM IMAGE SIZE
            // Handle per your liking

          } else {

            // Set the default selected image
            this.selectedDefaultImage = imagePreview;

            // Set the local image data
            this.selectedImageFullData = {
              dataGiven: imagePreview,
              dataAsAFile: file,
              type: file.type
            };

            this.helper.consoleHandler('Selected Image Full Data: ', this.selectedImageFullData);

            // Emit the image data back to the 'user-info' component
            this.selectedProfileImage.emit(this.selectedImageFullData);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
