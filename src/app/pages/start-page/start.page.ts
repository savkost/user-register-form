import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit {

  // Screen necessary fields
  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  constructor() {

    // Set up the screen size
    this.getScreenSize();
  }

  ngOnInit() {
  }

}
