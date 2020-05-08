import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'app/models/usuario.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  atualizarPerfil = new EventEmitter<Usuario>();

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Metodo para login
   * @param dados
   */
  logar(dados: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(environment.api_url + 'auth/login', dados)
      .pipe(tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
        }));
  }

  /**
   * Metodo para verificar se o usuario está logado
   */
  verificaUsuarioLogado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  /**
   *  Busca dados de usuario autenticado na base
   */
  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<Usuario>(environment.api_url + 'api/usuario/get_user')
      .pipe(tap(
        (resp: Usuario) => {
          resp['usuario']['imagem'] = environment.api_url + resp['usuario']['imagem'];
          this.atualizarPerfil.emit(resp['usuario']);
        }));
  }

  /**
   * Metodo para logout
   */
  logout(): void {
    this.http.get(environment.api_url + 'auth/logout').subscribe(resp => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    });
  }
}
