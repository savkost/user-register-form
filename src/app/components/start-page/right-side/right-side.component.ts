import {Component, HostListener, OnInit} from '@angular/core';
import {UserInformation} from "../../../Interfaces/user-information";
import {HelperService} from "../../../services/helper.service";

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss'],
  standalone: false
})
export class RightSideComponent  implements OnInit {

  // Screen necessary fields
  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  constructor(private helper: HelperService) { }

  ngOnInit() {

    // Set up the screen size
    this.getScreenSize();
  }

  /**
   * This method handles the navigation to the 'sign-in' page
   * @param isToSignIn
   */
  navSignIn(isToSignIn: boolean) {
    if (this.helper.checkUndefinedNull(isToSignIn) && isToSignIn){

    }
  }

  /**
   * This method handles all the register user actions
   * @param userInfoProvided
   */
  registerUser(userInfoProvided: UserInformation){

    // Console the received data
    this.helper.consoleHandler('User Information: ', userInfoProvided);
  }
}
