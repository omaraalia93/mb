import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app-core/index';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-error-forbidden',
  templateUrl: './error-forbidden.component.html',
  styleUrls: ['./error-forbidden.component.scss'],
})
export class ErrorForbiddenComponent implements OnInit {
  forbidden: AnimationOptions;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.forbidden = {
      path: 'assets/lotties/forbidden.json',
    };
  }

  navigateToDashboard(): void {
    this.navigationService.navigateToHome();
  }
}
