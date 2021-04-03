import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public formulario: FormGroup;
  public icon: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  logar() {
    this.ngxLoader.start();

    this.authService.logar(this.formulario.value).subscribe(
      (response) => {
        this.ngxLoader.stop();
        this.router.navigate(['dashboard']);
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error.message === 'Usuário inativo!') {
          this.ngxLoader.stop();

          this.icon = 'nc-bell-55';
          this.showNotificacao('top', 'right', 'warning', errorResponse.error.message, this.icon);
        } else if (errorResponse.error.message === 'Não autorizado!') {
          this.ngxLoader.stop();

          this.icon = 'nc-bell-55';
          this.showNotificacao('top', 'right', 'warning', errorResponse.error.message, this.icon);
        } else {
          this.ngxLoader.stop();

          this.icon = 'nc-bell-55';
          this.showNotificacao('top', 'right', 'warning', "Erro ao realizar o login. Tente novamente.", this.icon);
        }
      }
    );
  }

  showNotificacao(from, align, type, message, icon) {
    this.toastr.show(
      '<span data-notify="icon" class="nc-icon ' + icon + '"></span>' +
               '<span data-notify="message"><b>' + message + '</b></span>',
      '',
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-' + type + ' alert-with-icon',
        positionClass: 'toast-' + from + '-' + align
      }
    );
  }
}
