import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from 'app/models/usuario.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from 'app/services/auth.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[];
  usuarioLogado: Usuario;
  modalRef: BsModalRef;
  statusUsuarioModal: boolean;
  idUsuario: number;

  usuariosFiltrados: Usuario[];
  _filtroLista = '';

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.usuariosFiltrados = this.filtroLista ? this.filtrarUsuario(this.filtroLista) : this.usuarios;
  }

  ngOnInit() {
    this.buscarUsuarios();
    this.getUsuarioLogado();
  }

  filtrarUsuario(filtrarPor: string): Usuario[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter(
      usuario => usuario.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  buscarUsuarios() {
    this.ngxLoader.start();

    this.usuarioService.buscarUsuarios()
      .subscribe((resp: Usuario[]) => {
        this.usuarios = resp;
        this.usuariosFiltrados = resp;
        this.ngxLoader.stop();
      });
  }

  openModal(template: TemplateRef<any>, usuario: Usuario) {
    this.modalRef = this.modalService.show(template);
    this.statusUsuarioModal = usuario.status;
    this.idUsuario = usuario.id;
  }

  alterarStatus(idUsuario) {
    this.modalRef.hide()
    this.ngxLoader.start();

    this.usuarioService.alterarStatusUsuario(idUsuario)
      .subscribe((resp: any) => {
        this.showNotificacao('top', 'right', 'success', 'Status alterado com sucesso!', 'nc-check-2');
        this.buscarUsuarios();
      }, (error: any) => {
        this.showNotificacao('top', 'right', 'warning', error.error[0], 'nc-bell-55');
        this.ngxLoader.stop();
      });
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

  getUsuarioLogado() {
    this.usuarioLogado =  this.authService.getUsuarioStorage();
  }

  excluirPerfil() {
    this.modalRef.hide()
    this.ngxLoader.start();

    this.usuarioService.excluirPerfil(this.idUsuario).subscribe((resp: Usuario) => {
      this.showNotificacao('top', 'right', 'success', 'Usuário excluído com sucesso!', 'nc-check-2');
      this.buscarUsuarios();
    }, (error: any) => {
      this.showNotificacao('top', 'right', 'warning', error.error[0], 'nc-bell-55');
      this.ngxLoader.stop();
    });
  }
}
