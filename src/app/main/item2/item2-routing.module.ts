import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Item2Component } from './item2.component';

const routes: Routes = [
  {
    path: '',
    component: Item2Component,
    children:[
      // .... paths for children components
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Item2RoutingModule { }
