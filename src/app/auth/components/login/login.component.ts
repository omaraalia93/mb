import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailValidator} from '@app-shared/functions/validators';
import { AuthService } from '@app-auth/services/auth.service';
import { NavigationService } from '@app-core/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  inProgress: boolean;
  toggleEye: boolean;

  constructor(
    private navigationService:NavigationService,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.toggleEye = true;
    this.formInit(fb);
  }

  ngOnInit(): void {
    this.authService.removeCacheData();
  }

  formInit(fb: FormBuilder): void {
    this.form = fb.group({
      email: ['test@gmail.com', [Validators.required, emailValidator()]],
      password: ['123123', [Validators.required]],
    });
  }

  signin(): void {
    if (this.form.invalid || this.inProgress) return;
    this.inProgress = true;
    this.authService
      .signin(this.form.value)
      .subscribe({
        next: (data) => {
          this.navigationService.navigateToHome();
        }
      })
      .add(() => {
        this.inProgress = false;
      });
  }

  toggleEyeIcon(inputPassword: any) {
    this.toggleEye = !this.toggleEye;
    inputPassword.type =
      inputPassword.type === 'password' ? 'text' : 'password';
  }
}
