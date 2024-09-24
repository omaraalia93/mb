import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app-shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import { DashboardComponent, DashboardService, StockCardComponent } from '.';
import { HomeRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    StockCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {
}
