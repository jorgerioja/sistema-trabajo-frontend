import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  isLoggedIn: boolean = false;
  user: any = null;

  constructor(public login: LoginService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    setTimeout(() => {
      this.login.loginStatusSubject.asObservable().subscribe(data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      });
    }, 0);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
