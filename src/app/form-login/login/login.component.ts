import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from "../../auth/login-info";
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteSnapshot} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnUrl: '/user';
    hide = true;
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = 'Wrong useraccount or password! Please try again!';
    roles: string[] = [];
    userName: String;
    private loginInfo: AuthLoginInfo;

    constructor(private authService: AuthService, private route: Router,
                private tokenStorage: TokenStorageService,
                private routes: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAuthorities();
            this.userName = this.tokenStorage.getUsername()
        }
        this.returnUrl = this.routes.snapshot.queryParams.returnUrl || '/user';
    }

    onSubmit() {
        console.log(this.form);

        this.loginInfo = new AuthLoginInfo(
            this.form.username,
            this.form.password);

        this.authService.attemptAuth(this.loginInfo).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.roles);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getAuthorities();
                this.route.navigateByUrl(this.returnUrl);
                alert('Login success!!!');

                // @ts-ignore
                // this.route.url = '/user';
                // this.reloadPage();
                // this.route.navigate(['/user']);
                console.log("chinh" + this.route + "url" + this.route.url)
                // this.route.navigate(['/user']);
                // console.log("chinh1"+this.route + "url"+this.route.url)
                // this.reloadPage();
                // if (this.route.url === '/login') {
                // this.route.navigate(['/user']);
                // this.reloadPage();
                // } else {
                    window.location.reload();
                // }
            },
            error => {
                console.log(error);
                this.errorMessage = error.error.message;
                this.isLoginFailed = true;
                alert('Login Failed!!! Please login again! ');
                this.reloadPage();
            }
        );
    }

    reloadPage() {
        window.location.reload();
    }
}
