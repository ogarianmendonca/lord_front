import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario.interface';
import { Perfil } from 'app/models/perfil.interface';

/**
 * Usar em http.post
 */
const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json'}
  )
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApiUsusario = environment.api_url + 'api/usuario/';

  constructor(private http: HttpClient) { }

  // buscaUsuarios (): Observable<Usuario[]> {
  //   return this.http.get<Usuario[]>(this.urlApiUsusario + 'busca-usuarios');
  // }

  listaPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(environment.api_url + 'api/perfil/buscar_todos');
  }

  // cadastrarUsuario (dados): Observable<Usuario[]> {
  //   return this.http.post<Usuario[]>(this.urlApiUsusario + 'novo', dados, httpOptions);
  // }

  uploadImagem(arquivo) {
    const formData = new FormData();
    formData.append('imagem', arquivo[0]);
    return this.http.post(this.urlApiUsusario + 'upload', formData);
  }

  editarUsuario (id, dados): Observable<Usuario> {
    return this.http.put<Usuario>(this.urlApiUsusario + 'editar/' + id, dados, httpOptions);
  }

  // buscaUsuarioSelecionado(id) {
  //   return this.http.get<Usuario[]>(this.urlApiUsusario + 'detalhes/' + id);
  // }

  // alterarStatusUsuario(id) {
  //   return this.http.get<Usuario[]>(this.urlApiUsusario + 'alterar-status/' + id);
  // }
}