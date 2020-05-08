import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {UsuarioService} from '../../services/usuario.service';
import {ToastrService} from 'ngx-toastr';
import {Usuario} from '../../models/usuario.interface';
import { Perfil } from '../../models/perfil.interface';

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

  message: string;
  icon: string;

  constructor(private authService: AuthService,
              private router: ActivatedRoute,
              private ngxLoader: NgxUiLoaderService,
              private usuarioService: UsuarioService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.listarPerfis();
  }

  /**
   * Busca dados de usuario logado no storage
   */
  buscarUsuarioLogado() {
    this.ngxLoader.start();

    this.authService.getUsuarioAutenticado()
      .subscribe((resp: Usuario) => {
        this.user = resp['usuario'];
        this.ngxLoader.stop();
      });
  }

  /**
   * Listar perfis
   */
  listarPerfis() {
    this.usuarioService.listarPerfis()
      .subscribe((resp: Perfil[]) => {
        this.perfis = resp['perfis'];
      })
  }

  /**
   * Carrega imagem 
   */
  carregarImagem(event: any) {
    this.imagem = event.target.files;
  }

  /**
   * Editar usuário logado
   * @param form
   */
  editarUsuario(form) {
    this.ngxLoader.start();

    if (form.value.password !== form.value.confimarSenha) {
      this.showNotificacao('top', 'right', 'warning', 'As senhas não conferem!', 'nc-bell-55');
      return false;
    }

    const id = this.user['id'];

    if (!this.imagem) {
      this.usuarioService.editarUsuario(id, form.value).subscribe((resp: Usuario) => {
        this.showNotificacao('top', 'right', 'success', 'Usuário editado com sucesso!', 'nc-check-2');
        this.buscarUsuarioLogado();
      }, (err) => {
        this.showNotificacao('top', 'right', 'warning', 'Erro ao editar usuário!', 'nc-bell-55');
        this.ngxLoader.stop();
      })
    } else {
      this.usuarioService.uploadImagem(this.imagem).subscribe(resImg => {
        form.value.imagem = resImg['imagem'];
    
        this.usuarioService.editarUsuario(id, form.value).subscribe((resp: Usuario) => {
          this.showNotificacao('top', 'right', 'success', 'Usuário editado com sucesso!', 'nc-check-2');
          this.buscarUsuarioLogado();
        }, (err) => {
          this.showNotificacao('top', 'right', 'warning', 'Erro ao editar usuário!', 'nc-bell-55');
          this.ngxLoader.stop();
        })
      });
    }
  }

  /**
   * Mostra alerta com mensagem
   */
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