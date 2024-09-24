import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Item3RoutingModule } from './item3-routing.module';
import { Item3Component } from '.';


@NgModule({
  declarations: [
    Item3Component
  ],
  imports: [
    CommonModule,
    Item3RoutingModule
  ]
})
export class Item3Module { }
