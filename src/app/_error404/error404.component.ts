import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app-core/index';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
})
export class Error404Component implements OnInit {
  notfound: AnimationOptions;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.notfound = {
      path: 'assets/lotties/not-found.json',
    };
  }

  navigateToDashboard(): void {
    this.navigationService.navigateToHome();
  }
}
