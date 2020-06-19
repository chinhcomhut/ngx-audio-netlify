import { Component, OnInit } from '@angular/core';
import {ChangeProfile} from "../../auth/change-profile";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {

  title = 'Thay Đổi Mật Khẩu';
  form: any = {};
  changePassword: ChangeProfile;
  isChangePassed = false;
  errorMessage = '';

  constructor(
      private authService: AuthService,
      private router: Router) {
  }

  ngOnInit() {
  }

  ngSubmit() {
    this.changePassword = new ChangeProfile(
        this.form.currentPassword,
        this.form.newPassword,
        this.form.confirmPassword);

    this.authService
        .changePasswordAuth(this.changePassword)
        .subscribe(
            data => {
              console.log(data);
              this.isChangePassed = true;
              alert('Bạn đã thay đổi Mật Khẩu thành công');
              this.router.navigate(['/user']);
            },
            error => {
              console.log(error);
              this.errorMessage = error.error.message,
                  alert('Bạn chưa thay đổi thành công');
            });
  }

}
