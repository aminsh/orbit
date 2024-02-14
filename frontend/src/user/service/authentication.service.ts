import {Injectable} from "@angular/core"
import {BehaviorSubject, Observable} from "rxjs"
import {Token, User} from "../user.type"
import {Nullable} from "../../core/type"
import {Apollo} from 'apollo-angular'
import {GET_AUTHENTICATED_USER} from '../graphql/login.graphql';
import {AUTHENTICATION_TOKEN} from '../user.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public userSubject!: BehaviorSubject<Nullable<User>>
  public user: Observable<Nullable<User>>
  public isAuthenticated: boolean = false

  constructor(
    private apollo: Apollo,
  ) {
    this.userSubject = new BehaviorSubject<Nullable<User>>(null)
    this.user = this.userSubject.asObservable()
    this.setPersistedToken()
  }

  setAuthenticatedUser(token: Token) {
   this.persistUser(token)
  }

  logout() {
    this.userSubject.next(null)
    localStorage.removeItem(AUTHENTICATION_TOKEN)
  }

  setToken(token: Token) {
    localStorage.setItem(AUTHENTICATION_TOKEN, JSON.stringify(token))
    this.isAuthenticated = true
    this.persistUser(token)
  }

  private setPersistedToken() {
    this.userSubject = new BehaviorSubject<Nullable<User>>(null)
    this.isAuthenticated = false
  }

  private persistUser(token: Token) {
    this.apollo.query<User>({
      query: GET_AUTHENTICATED_USER
    })
      .subscribe(({data: user}) => {
        if(!user)
          return

        this.userSubject.next(user)
      })
  }
}
