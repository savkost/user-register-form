import {NgModule} from "@angular/core";
import {BasicInputComponent} from "./basic-input/basic-input.component";
import {LeftSideComponent} from "./start-page/left-side/left-side.component";
import {RightSideComponent} from "./start-page/right-side/right-side.component";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SKTelInputModule} from "sk-tel-input";
import {TranslateModule} from "@ngx-translate/core";
import {UserInfoComponent} from "./start-page/right-side/user-info/user-info.component";
import {SelectProfileImageComponent} from "./start-page/right-side/select-profile-image/select-profile-image.component";

@NgModule({
  declarations: [
    BasicInputComponent,
    LeftSideComponent,
    RightSideComponent,
    UserInfoComponent,
    SelectProfileImageComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, SKTelInputModule, TranslateModule, ReactiveFormsModule],
  exports: [
    BasicInputComponent,
    LeftSideComponent,
    RightSideComponent,
    UserInfoComponent,
    SelectProfileImageComponent
  ]
})
export class ComponentMasterModule {}
