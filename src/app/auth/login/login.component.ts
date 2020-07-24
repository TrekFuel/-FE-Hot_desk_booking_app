import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {LoginService} from './services/login.service';
import {LoginUser} from './models/login-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective:
    FormGroupDirective;
  hide = true;

  loginData: LoginUser;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this._initAuthForm();
  }

  private _initAuthForm() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    this.loginData = {
      password: this.password.value,
      username: this.email.value,
    };
    this.loginService.login(this.loginData)
      .subscribe(() => {
        this.formGroupDirective.resetForm();
      });
  }

  onHideShowClick() {
    this.hide = !this.hide;
    return false;
  }

}
