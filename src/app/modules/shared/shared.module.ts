import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IndexSharedComponent } from './index-shared.component';
import { CustomConnectionStatusComponent } from './components/custom-connection-status/custom-connection-status.component';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomDropDownComponent } from './components/custom-drop-down/custom-drop-down.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomStatusIndicatorComponent } from './components/custom-status-indicator/custom-status-indicator.component';
import { CustomTitleComponent } from './components/custom-title/custom-title.component';
import { CustomSubTitleComponent } from './components/custom-sub-title/custom-sub-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMenuButtonComponent } from './components/custom-menu-button/custom-menu-button.component';
import { CustomLoadingComponent } from './components/custom-loading/custom-loading.component';
import { CustomTabButtonComponent } from './components/custom-tab-button/custom-tab-button.component';
import { CustomDotMenuComponent } from './components/custom-dot-menu/custom-dot-menu.component';
import { CustomIconComponent } from './components/custom-icon/custom-icon.component';


@NgModule({
  declarations: [
    IndexSharedComponent,

    CustomButtonComponent,
    CustomConnectionStatusComponent,
    CustomDotMenuComponent,
    CustomDropDownComponent,
    CustomIconComponent,
    CustomInputComponent,
    CustomLoadingComponent,
    CustomMenuButtonComponent,
    CustomNotificationComponent,
    CustomStatusIndicatorComponent,
    CustomSubTitleComponent,
    CustomTabButtonComponent,
    CustomTitleComponent,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CustomButtonComponent,
    CustomConnectionStatusComponent,
    CustomDotMenuComponent,
    CustomDropDownComponent,
    CustomIconComponent,
    CustomInputComponent,
    CustomLoadingComponent,
    CustomMenuButtonComponent,
    CustomNotificationComponent,
    CustomStatusIndicatorComponent,
    CustomSubTitleComponent,
    CustomTabButtonComponent,
    CustomTitleComponent,
  ]
})
export class SharedModule { }
