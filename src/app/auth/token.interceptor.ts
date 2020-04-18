import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = environment.api_url.split('/');
        const token = localStorage.getItem('token');

        if (token && (requestUrl[2] === apiUrl[2])) {
            const newRequest = request.clone(
                {
                    setHeaders: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );

            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
    }
}
