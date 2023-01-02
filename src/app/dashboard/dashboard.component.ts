import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { UserData } from '../user.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users$: any = [];
  public message = 'status: N/A';

  constructor(private userData: UserData, private toastr: ToastrService, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.users$ = this.userData.getUsers();
    if (this.authService.isLoggedIn) {
      this.message = 'status: logged in'
    }
  }

  logout() {
    this.authService.logout();
    this.message = 'status: logged out';
    this.toastr.success('', 'You are now logged out');
    this.router.navigate(["/login"]);
  }

}
