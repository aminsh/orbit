import {CanActivate, Router} from "@angular/router"
import {AuthenticationService} from "./authentication.service"
import {Injectable} from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if(this.authenticationService.isAuthenticated)
      return true

    this.router.navigate(['/login'])
    return false
  }
}
