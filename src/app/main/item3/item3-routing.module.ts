import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Item3Component } from './item3.component';

const routes: Routes = [
  {
    path: '',
    component: Item3Component,
    children:[
      // .... paths for children components
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Item3RoutingModule { }
