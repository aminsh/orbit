import {Injectable} from "@angular/core"
import {BehaviorSubject, Observable} from "rxjs"
import {Token, User} from "../user.type"
import {Nullable} from "../../core/type"
import {Apollo} from 'apollo-angular'
import {GET_AUTHENTICATED_USER, UserAuthenticatedResponse} from '../graphql/login.graphql';
import {AUTHENTICATION_TOKEN} from '../user.constant';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public userSubject!: BehaviorSubject<Nullable<User>>
  public user: Observable<Nullable<User>>
  public isAuthenticated: boolean = false

  constructor(
    private apollo: Apollo,
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<Nullable<User>>(null)
    this.user = this.userSubject.asObservable()
    this.setPersistedToken()
  }

  logout() {
    this.userSubject.next(null)
    localStorage.removeItem(AUTHENTICATION_TOKEN)
    this.router.navigate(['/login'])
  }

  setToken(token: Token) {
    localStorage.setItem(AUTHENTICATION_TOKEN, JSON.stringify(token))
    this.isAuthenticated = true
    this.fetchUser(token)
  }

  private setPersistedToken() {
    this.userSubject = new BehaviorSubject<Nullable<User>>(null)

    const tokenJson = localStorage.getItem(AUTHENTICATION_TOKEN)

    if (tokenJson) {
      const token = JSON.parse(tokenJson)
      this.fetchUser(token)
      this.isAuthenticated = true
    } else
      this.isAuthenticated = false
  }

  private fetchUser(token: Token) {
    this.apollo.query<UserAuthenticatedResponse>({
      query: GET_AUTHENTICATED_USER,
    })
      .subscribe((response) => {
        const user = response.data?.userAuthenticated

        if (!user)
          return

        this.userSubject.next(user)
      })
  }
}
