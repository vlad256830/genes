import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ErrorsService } from 'src/app/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any;
  showSpinner = false;
  constructor(public authService: AuthService, private router: Router, private errorsService: ErrorsService) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }
  login() {
    this.showSpinner = true;
    this.authService.login({'username': this.user.username, 'password': this.user.password})
    .subscribe(
      data => {
        this.authService.updateData(data['token']);
        this.showSpinner = false;
        this.router.navigate(['/analiz']);
      },
      err => {
        console.log(err['error']);
        const error = err['error'];
        if (error.non_field_errors) {
          this.errorsService.openSnackBar(error.non_field_errors[0]);
        } else {
          this.errorsService.openSnackBar('All input data required.');
        }

      }
    );
  }

  logout() {
    this.authService.logout();
  }

}
