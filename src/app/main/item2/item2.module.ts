import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Item2RoutingModule } from './item2-routing.module';
import { Item2Component } from '.';


@NgModule({
  declarations: [
    Item2Component
  ],
  imports: [
    CommonModule,
    Item2RoutingModule
  ]
})
export class Item2Module { }
