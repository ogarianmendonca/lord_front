import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'app/models/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private ngxLoader: NgxUiLoaderService,
              private usuarioService: UsuarioService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.buscarUsuarios();
  }

  /**
   * Buscar usuários cadastrados
   */
  buscarUsuarios() {
    this.ngxLoader.start();

    this.usuarioService.buscarUsuarios()
      .subscribe((resp: Usuario[]) => {
        this.usuarios = resp;
        this.ngxLoader.stop();
      });
  }

  visualizarUsuario() {
    console.log("visualizar usuário");
  }

  alterarStatus() {
    console.log("alterar status usuário");
  }

}
