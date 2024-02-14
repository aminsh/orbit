import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LoginEntry} from "../user.type"
import {AuthenticationService} from '../service/authentication.service'
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {LoginDTOVariable, LoginResponse, USER_LOGIN_REQUEST} from '../graphql/login.graphql';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private apollo: Apollo,
  ) {
  }

  form = new FormGroup<LoginEntry>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  message!: string

  async submit(): Promise<void> {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({onlySelf: true})
        }
      })
      return
    }

    this.message = ''

    const {email, password} = this.form.getRawValue()

    this.apollo.mutate<LoginResponse, LoginDTOVariable>({
      mutation: USER_LOGIN_REQUEST,
      variables: {
        dto: {
          email: email || '',
          password: password || '',
        },
      },
    }).subscribe(result => {
      if (!result.data)
        return

      this.authenticationService.setToken(result.data?.userLogin)
      this.router.navigate(['/'])
    }, error => {
      if (error.message === 'Unauthorized')
        this.message = 'login_error_message'
    })
  }
}
