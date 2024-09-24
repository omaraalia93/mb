import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Item1RoutingModule } from './item1-routing.module';
import { Item1Component } from '.';


@NgModule({
  declarations: [
    Item1Component
  ],
  imports: [
    CommonModule,
    Item1RoutingModule
  ]
})
export class Item1Module { }
