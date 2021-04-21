import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario.interface';
import { Perfil } from 'app/models/perfil.interface';

const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json'}
  )
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApiUsuario = environment.api_url + 'api/usuario/';

  constructor(private http: HttpClient) { }

  buscarUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlApiUsuario + 'buscar-usuarios');
  }

  listarPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(environment.api_url + 'api/perfil/buscar-perfis');
  }

  cadastrarUsuario (dados): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlApiUsuario + 'cadastrar', dados, httpOptions);
  }

  uploadImagem(arquivo) {
    const formData = new FormData();
    formData.append('imagem', arquivo[0]);
    return this.http.post(this.urlApiUsuario + 'upload', formData);
  }

  editarUsuario (id, dados): Observable<Usuario> {
    return this.http.put<Usuario>(this.urlApiUsuario + 'editar/' + id, dados, httpOptions);
  }

  buscarUsuarioSelecionado(id) {
    return this.http.get<Usuario>(this.urlApiUsuario + 'visualizar-usuario/' + id);
  }

  alterarStatusUsuario(id) {
    return this.http.put(this.urlApiUsuario + 'alterar-status/' + id, [], httpOptions);
  }
}
