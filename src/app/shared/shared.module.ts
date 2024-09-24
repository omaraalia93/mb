import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  ActionModalComponent,
  ActionModalIconPipe,
  ActionsIconPipe,
  AllowNumberDirective,
  BaseModalComponent,
  FloatingLabelInputComponent,
  FormErrorComponent,
  HideTooltipDirective,
  InProgressPipe,
  MyModalComponent,
  PlaceholderPipe,
  RequiredLabelPipe,
  SafePipe,
  ToggleButtonComponent,
  ActiveListDirective,
} from './index';
import { CardComponent } from './components/card/card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UnitPipe } from './pipes/unit.pipe';
 
const exportedItems = [
  CardComponent,
  SafePipe,
  InProgressPipe,
  FormErrorComponent,
  AllowNumberDirective,
  PlaceholderPipe,
  RequiredLabelPipe,
  ToggleButtonComponent,
  MyModalComponent,
  BaseModalComponent,
  HideTooltipDirective,
  ActionsIconPipe,
  ActionModalComponent,
  ActionModalIconPipe,
  ActiveListDirective,
  CardComponent,
  UnitPipe,
  FloatingLabelInputComponent,
];

@NgModule({
  declarations: [...exportedItems],
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgScrollbarModule,
    MatTabsModule
  ],
  exports: [MatTabsModule,NgScrollbarModule, NgbModule, ...exportedItems],
})
export class SharedModule {}
