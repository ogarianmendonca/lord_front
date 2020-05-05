import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FormsModule } from "@angular/forms";
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { AuthModule } from './auth/auth.module';

import { AppRoutes } from './app.routing';
import { AuthGuard } from './auth/auth.guard';
import { AppErrorHandle } from './app.error-handle';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

/**
 * Configuração do NgxUiLoader
 */
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#00ACC1',
  fgsColor: '#00acc1',
  bgsOpacity: 0.1
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    AuthModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandle }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
