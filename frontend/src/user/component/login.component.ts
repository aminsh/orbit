import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LoginEntry, Token} from "../user.type"
import {AuthenticationService} from '../service/authentication.service'
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {LoginDTOVariable, USER_LOGIN_REQUEST} from '../graphql/login.graphql';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router, private apollo: Apollo,) {
  }

  form = new FormGroup<LoginEntry>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  async submit(): Promise<void> {
    const {email, password} = this.form.getRawValue()

    this.apollo.mutate<Token, LoginDTOVariable>({
      mutation: USER_LOGIN_REQUEST,
      variables: {
        dto: {
          email: email || '',
          password: password || '',
        }
      }
    }).subscribe(result => {
      if(!result.data)
        return

      this.authenticationService.setAuthenticatedUser(result.data)
      this.router.navigate(['/'])
    })
  }
}
