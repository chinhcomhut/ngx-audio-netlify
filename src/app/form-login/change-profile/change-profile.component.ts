import { Component, OnInit } from '@angular/core';
import {ChangePassword} from "../../auth/change-password";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {

  title = 'Thay Đổi Mật Khẩu';
  form: any = {};
  changePassword: ChangePassword;
  isChangePassed = false;
  errorMessage = '';

  constructor(
      private authService: AuthService,
      private tokenStorageService: TokenStorageService,
      private router: Router) {
  }

  ngOnInit() {
      // if (this.tokenStorageService.getToken()) {
      //
      //     this.changePassword = new ChangePassword(
      //         this.form.currentPassword,
      //         this.form.newPassword,
      //         this.form.confirmPassword
      //     );

  }

  ngSubmit() {
    this.changePassword = new ChangePassword(
        this.form.currentPassword,
        this.form.newPassword,
        this.form.confirmPassword);
        console.log("changePassword"+this.form.currentPassword)
      console.log(this.form.newPassword)
    this.authService.changePasswordAuth(this.changePassword).subscribe(
        data => {
            console.log("data1")
              console.log("data"+data);
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
