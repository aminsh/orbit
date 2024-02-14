import {Component} from "@angular/core";

@Component({
  template: `
    <div class="auth-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .auth-container {
        height: 100vh;
        width: 100vw;
        align-items: center;
        justify-content: center;
        display: flex;
      }
    `
  ]
})
export class AuthLayoutComponent {}
