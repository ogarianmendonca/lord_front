import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario.interface';
import { Perfil } from '../../models/perfil.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

  user: Usuario;
  perfis: Perfil[];
  imagem: Set<File>;
  formularioUsuario: FormGroup;

  message: string;
  icon: string;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.listarPerfis();
  }

  buscarUsuarioLogado() {
    this.ngxLoader.start();

    this.authService.getUsuarioAutenticado()
      .subscribe((resp: Usuario) => {
        this.user = resp['usuario'];
        this.validaFormulario(this.user);
        this.ngxLoader.stop();
      });
  }

  validaFormulario(user) {
    this.formularioUsuario = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      perfil_id: [user.perfil_id],
      status: [user.status],
      imagem: [''],
      password: [''],
      confimarSenha: ['']
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

  editarUsuario() {
    this.ngxLoader.start();

    if (this.formularioUsuario.value.password !== this.formularioUsuario.value.confimarSenha) {
      this.showNotificacao('top', 'right', 'warning', 'As senhas não conferem!', 'nc-bell-55');
      this.ngxLoader.stop();
      return false;
    }

    const id = this.user['id'];

    if (!this.imagem) {
      this.usuarioService.editarUsuario(id, this.formularioUsuario.value).subscribe((resp: Usuario) => {
        this.showNotificacao('top', 'right', 'success', 'Usuário editado com sucesso!', 'nc-check-2');
        this.buscarUsuarioLogado();
      }, (err) => {
        this.showNotificacao('top', 'right', 'warning', 'Erro ao editar usuário!', 'nc-bell-55');
        this.ngxLoader.stop();
      })
    } else {
      this.usuarioService.uploadImagem(this.imagem).subscribe(resImg => {
        this.formularioUsuario.value.imagem = resImg['imagem'];

        this.usuarioService.editarUsuario(id, this.formularioUsuario.value).subscribe((resp: Usuario) => {
          this.showNotificacao('top', 'right', 'success', 'Usuário editado com sucesso!', 'nc-check-2');
          this.buscarUsuarioLogado();
        }, (err) => {
          this.showNotificacao('top', 'right', 'warning', 'Erro ao editar usuário!', 'nc-bell-55');
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
