import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  MainComponent,
  SideNavComponent,
  UserSettingsComponent,
  menuIconPipe,
} from '@app-main/index';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    menuIconPipe,
    SideNavComponent,
    UserSettingsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgbModule,
    TranslateModule.forChild(),
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
  ],
})
export class MainModule {}
