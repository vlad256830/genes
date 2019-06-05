import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor(private authService: AuthService ) { }

  isAuth(): boolean {
    // console.log('isAuthenticated ', this.authService.isAuthenticated());
    // console.log('isLoggedIn ', this.authService.isLoggedIn());
    return (this.authService.isAuthenticated() && this.authService.isLoggedIn()) ;
  }
}
