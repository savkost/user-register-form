import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInformation} from "../../../../Interfaces/user-information";
import {HelperService} from "../../../../services/helper.service";
import {IsoCode, SKTelInputOutput} from "sk-tel-input";
import {ProfileImage} from "../../../../Interfaces/profile-image";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: false
})
export class UserInfoComponent  implements OnInit {

  // OUTPUTS
  @Output() userInfoProvided: EventEmitter<UserInformation> = new EventEmitter();
  @Output() navigateSignIn: EventEmitter<boolean> = new EventEmitter();

  // Local Fields
  createUserForm: FormGroup;
  public IsoCode = IsoCode;

  // Screen necessary fields
  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  constructor(public helper: HelperService, private formBuilder: FormBuilder, ) { }

  ngOnInit() {

    // Set up the screen size
    this.getScreenSize();

    // Set up the user information form
    this.createUserForm = this.formBuilder.group({
      profileImage: new FormControl(null, Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('',  Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')])),
      mobile: new FormControl('', Validators.required),
      mobilePrefix: new FormControl('+30', Validators.required),
    });
  }

  /**
   * This method removes all contents from the user form
   */
  cleanUserFormAndContents(){

    // Reset the contents
    this.createUserForm.get('fullName').setValue('');
    this.createUserForm.get('email').setValue('');
    this.createUserForm.get('mobile').setValue('');
    this.createUserForm.get('mobilePrefix').setValue('+30');

    // Set up the initial image
    this.createUserForm.get('profileImage').setValue(null);
  }

  /**
   * This method returns the value of a selected control of the form
   * @param givenControlTag
   */
  getUserFormControlValue(givenControlTag: string): any {
    return this.createUserForm.get(givenControlTag).value;
  }

  /**
   * This method receives and updates the contents of each input
   * @param inputContents
   * @param inputFormControl
   */
  receiveInputContents(inputContents: string, inputFormControl: string){
    this.createUserForm.get(inputFormControl).setValue(inputContents);

    // Set the internal value and emit the change event
    switch (inputFormControl){
      case 'fullName':
        // FULL NAME
        this.createUserForm.get('fullName').setValue(inputContents);
        break;

      case 'email':
        // EMAIL
        this.createUserForm.get('email').setValue(inputContents);
        break;
    }
  }

  // This method handles the pressing of ENTER key on the form
  enterKeyPressed(enterPressed: boolean){
    if (this.helper.checkUndefinedNull(enterPressed) && enterPressed){
    }
  }

  /**
   * This method emits the event to navigate to the 'sign-in' page
   */
  navigateToSignIn(){
    this.navigateSignIn.emit(true);
  }

  /**
   * This method is handling the output of the sk tel input
   * @param skTelOutput
   */
  handleSkTelInputContents(skTelOutput: SKTelInputOutput){
    this.helper.consoleHandler('SK Tel Input Output: ', skTelOutput);

    // Proper set up the content and the form fields
    this.createUserForm.get('mobilePrefix').setValue(`+${skTelOutput.selectedCountryCode.dialCode}`);
    this.createUserForm.get('mobile').setValue(`${skTelOutput.telInputContents}`);
  }

  /**
   * This method handles the selected image
   * @param selectedImage
   */
  handleSelectedImage(selectedImage: ProfileImage){

    // Set the selected image to the form - All data of 'Profile' Image Type
    this.createUserForm.get('profileImage').setValue(selectedImage);
  }

  /**
   * This method checks if the register button should be disabled
   */
  checkIfDisabledButton(): boolean {

    // 1. Full name
    if (!this.helper.checkNecessaryCases(this.createUserForm.get('fullName').value.trim())){
      return true;
    }

    // 2. Email
    if (!this.helper.checkNecessaryCases(this.createUserForm.get('email').value.trim())){
      return true;
    }

    // 3. Mobile Phone Number
    if (!this.helper.checkUndefinedNull(this.createUserForm.get('mobile').value.trim())){
      return true;
    }

    // ALL CONTROLS OK.
    return false;
  }

  /**
   * This method emits the provided data back to the right-side component
   */
  emitProvidedData(){

    // Create the 'user-information' object
    const userInformationProvided: UserInformation = {
      profileImage: this.createUserForm.get('profileImage').value,
      fullName: this.createUserForm.get('fullName').value.trim(),
      email: this.createUserForm.get('email').value.trim(),
      mobilePrefix: this.createUserForm.get('mobilePrefix').value,
      mobile: this.createUserForm.get('mobile').value.trim()
    };

    // Emit the data
    this.userInfoProvided.emit(userInformationProvided);

    // Erase all the contents of the form
    this.cleanUserFormAndContents();
  }
}
