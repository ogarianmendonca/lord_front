import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'app/models/usuario.interface';
import { Perfil } from 'app/models/perfil.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.scss']
})
export class UsuariosCreateComponent implements OnInit {
  user: Usuario;
  perfis: Perfil[];
  imagem: Set<File>;
  formularioUsuario: FormGroup;

  message: string;
  icon: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listarPerfis();
    this.validaFormulario();
  }

  validaFormulario() {
    this.formularioUsuario = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      perfil_id: ['', [Validators.required]],
      imagem: [''],
      password: ['', [Validators.required]],
      confimarSenha: ['', [Validators.required]]
    });
  }

  listarPerfis() {
    this.usuarioService.listarPerfis()
      .subscribe((resp: Perfil[]) => {
        this.perfis = resp;
      })
  }

  carregarImagem(event: any) {
    this.imagem = event.target.files;
  }

  cadastrarUsuario() {
    this.ngxLoader.start();

    if (this.formularioUsuario.value.password !== this.formularioUsuario.value.confimarSenha) {
      this.showNotificacao('top', 'right', 'warning', 'As senhas não conferem!', 'nc-bell-55');
      this.ngxLoader.stop();
      return false;
    }

    if (!this.imagem) {
      this.usuarioService.cadastrarUsuario(this.formularioUsuario.value).subscribe((resp: Usuario) => {
        this.showNotificacao('top', 'right', 'success', 'Usuário cadastrado com sucesso!', 'nc-check-2');
        this.router.navigate(['usuarios/listar']);
      }, (error) => {
        this.showNotificacao('top', 'right', 'warning', error.error[0], 'nc-bell-55');
        this.ngxLoader.stop();
      })
    } else {
      this.usuarioService.uploadImagem(this.imagem).subscribe(resImg => {
        this.formularioUsuario.value.imagem = resImg['imagem'];

        this.usuarioService.cadastrarUsuario(this.formularioUsuario.value).subscribe((resp: Usuario) => {
          this.showNotificacao('top', 'right', 'success', 'Usuário cadastrado com sucesso!', 'nc-check-2');
          this.router.navigate(['usuarios/listar']);
        }, (error) => {
          this.showNotificacao('top', 'right', 'warning', error.error[0], 'nc-bell-55');
          this.ngxLoader.stop();
        })
      });
    }
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
