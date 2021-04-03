import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'app/models/usuario.interface';
import { Perfil } from 'app/models/perfil.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {
  usuario: Usuario;
  perfis: Perfil[];
  imagem: Set<File>;
  formularioUsuario: FormGroup;
  user: Usuario;

  message: string;
  icon: string;

  constructor(
    private formBuilder: FormBuilder,
    private routerActivated: ActivatedRoute,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.buscarUsuarioSelecionado();
    this.listarPerfis();
    this.getUsuarioStorage();
  }

  getUsuarioStorage() {
    this.user = this.authService.getUsuarioStorage();
  }

  buscarUsuarioSelecionado() {
    this.ngxLoader.start();
    const id = this.routerActivated.snapshot.params['id'];

    this.usuarioService.buscarUsuarioSelecionado(id)
      .subscribe((resp: Usuario) => {
        this.usuario = resp['usuario'];
        this.validaFormulario(this.usuario);
        this.ngxLoader.stop();
      });
  }

  validaFormulario(usuario) {
    this.formularioUsuario = this.formBuilder.group({
      name: [usuario.name, [Validators.required]],
      email: [usuario.email, [Validators.required, Validators.email]],
      perfil_id: [usuario.perfil_id],
      status: [usuario.status],
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

    const id = this.usuario['id'];

    if (!this.imagem) {
      this.usuarioService.editarUsuario(id, this.formularioUsuario.value).subscribe((resp: Usuario) => {
        this.showNotificacao('top', 'right', 'success', 'Usuário editado com sucesso!', 'nc-check-2');
        this.router.navigate(['usuarios/listar']);
      }, (error) => {
        this.showNotificacao('top', 'right', 'warning', error.error[0], 'nc-bell-55');
        this.ngxLoader.stop();
      })
    } else {
      this.usuarioService.uploadImagem(this.imagem).subscribe(resImg => {
        this.formularioUsuario.value.imagem = resImg['imagem'];

        this.usuarioService.editarUsuario(id, this.formularioUsuario.value).subscribe((resp: Usuario) => {
          this.showNotificacao('top', 'right', 'success', 'Usuário editado com sucesso!', 'nc-check-2');
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
