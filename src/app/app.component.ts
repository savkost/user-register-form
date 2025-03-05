import { Component } from '@angular/core';
import {Platform} from "@ionic/angular";
import {HelperService} from "./services/helper.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform, public translate: TranslateService, private helper: HelperService) {
    this.initializeApp();
  }

  /**
   * This method makes all the necessary initializations
   */
  async initializeApp() {
    this.platform.ready().then(() => {

      // Set as the default language the 'en'
      this.setInitialLanguage('en');
    });
  }

  /**
   * This method sets the browser language
   * @param languageCode
   */
  setInitialLanguage(languageCode: string){

    // Set as default language the ENGLISH language
    this.translate.setDefaultLang(languageCode);
    this.translate.use(languageCode);
  }
}
