import { ChangeDetectorRef, Component, OnInit, AfterViewChecked } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  loginData = {
    "username": '',
    "password": ''
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('Ingrese su nombre!!', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('Ingrese su contraseña!!', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);
          this.cdr.detectChanges();
          this.redirectUser();
        });
      },
      (error) => {
        console.log(error);
        this.snack.open('Detalles inválidos, vuelva a intentar!', 'Aceptar', {
          duration: 3000
        });
      }
    );
  }

  private redirectUser() {
    if (this.loginService.getUserRole() == "ADMIN") {
      this.router.navigate(['admin']);
    } else if (this.loginService.getUserRole() == "BASICO") {
      this.router.navigate(['user-dashboard']);
    } else {
      this.loginService.logout();
    }
    this.loginService.loginStatusSubject.next(true);
  }
}
