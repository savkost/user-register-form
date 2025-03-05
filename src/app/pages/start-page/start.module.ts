import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StartPagePageRoutingModule } from './start-routing.module';
import {ComponentMasterModule} from "../../components/component-master-module";
import {TranslateModule} from "@ngx-translate/core";
import {StartPage} from "./start.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPagePageRoutingModule,
    ComponentMasterModule,
    TranslateModule
  ],
  declarations: [StartPage]
})
export class StartPagePageModule {}
