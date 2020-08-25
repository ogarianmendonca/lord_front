import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppErrorHandle extends ErrorHandler {

    constructor(private injector: Injector) {
        super();
    }

    /**
     * Tratamento de erros de retorno do backend
     * @param errorResponse
     */
    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.status === 401 && errorResponse.statusText === 'Unauthorized') {
                this.redirecionaLogin();
            }

            const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

            if (error.error === 'The token has been blacklisted') {
              this.redirecionaLogin();
            }

            if (error.error === 'token_expired') {
                this.redirecionaLogin();
            }

            if ((errorResponse.status === 400 || errorResponse.status === 401) && (
              error.error === 'token_expired' ||
              error.error === 'token_invalid' ||
              error.error === 'A token is required' ||
              error.error === 'token_not_provided')) {
                this.redirecionaLogin();
            }
        }

        super.handleError(errorResponse);
    }

    /**
     * Redireciona o sistema para a tela de login
     */
    redirecionaLogin(): void {
        window.location.reload();
        const router = this.injector.get(Router);
        localStorage.clear();
        router.navigate(['auth/login']);
    }
}
