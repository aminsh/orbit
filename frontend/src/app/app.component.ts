import {Component} from '@angular/core'
import {AuthenticationService} from "../user/service/authentication.service"
import {Nullable} from "../core/type"
import {User} from "../user/user.type"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authenticationService: AuthenticationService,
  ) {
    this.authenticationService.userSubject.subscribe(user => this.authenticatedUser = user)
  }

  authenticatedUser!: Nullable<User>
  isCollapsed = false;
}
