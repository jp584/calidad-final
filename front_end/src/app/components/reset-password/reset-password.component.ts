import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  token: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword() {
    const url = `http://localhost:8080/api/auth/reset-password?token=${this.token}&newPassword=${this.newPassword}`;

    this.http.post(url, {}).subscribe({
      next: (response) => {
        console.log('Password reset successfully', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }


}
