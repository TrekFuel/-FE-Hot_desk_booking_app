import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective:
    FormGroupDirective;
  hide = true;

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
        Validators.email,
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    this.loginService.login(this.email.value, this.password.value)
      .subscribe(() => {
        this.formGroupDirective.resetForm();
      });
  }

  onHideShowClick() {
    this.hide = !this.hide;
    return false;
  }

}
