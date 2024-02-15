import {Component} from "@angular/core";
import {Apollo} from 'apollo-angular'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {makeFormDirty} from '../../core/utils/form.utils'
import {RegisterDTOVariable, RegisterResponse, USER_REGISTER_REQUEST} from '../graphql/register.graphql'
import {Router} from '@angular/router'
import {NotifyService} from '../../core/service/notify.service'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private apollo: Apollo,
    private router: Router,
    private notify: NotifyService,
  ) {
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  message!: string

  async submit() {
    if (!this.form.valid)
      return makeFormDirty(this.form)

    this.message = ''

    this.apollo.mutate<RegisterResponse, RegisterDTOVariable>({
      mutation: USER_REGISTER_REQUEST,
      variables: {
        dto: this.form.getRawValue() as RegisterDTOVariable['dto'],
      },
    })
      .subscribe(
        () => {
          this.notify.success({
            title: 'registration',
            content: 'registration_success_message',
          })

          this.router.navigate(['/login'])
        },
        error => {
          this.message = error.message
        },
      )
  }
}
