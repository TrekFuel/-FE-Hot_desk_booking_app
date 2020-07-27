import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {LoginUser} from './models/login-user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {LoginStartAction} from '../../store/actions/auth.actions';

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

  loginUserData: LoginUser;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(private store$: Store<AppState>) {
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
    this.loginUserData = {
      password: this.password.value,
      username: this.email.value,
    };
    this.store$.dispatch(new LoginStartAction({loginData: this.loginUserData}));
    this.formGroupDirective.resetForm();
  }

  onHideShowClick() {
    this.hide = !this.hide;
    return false;
  }

}
