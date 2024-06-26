import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminLayoutRoutes } from './admin-layout.routing';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';

// Novos Componentes
import { UsuariosComponent } from 'app/pages/usuarios/usuarios.component';
import { UsuariosCreateComponent } from 'app/pages/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosEditComponent } from 'app/pages/usuarios/usuarios-edit/usuarios-edit.component';
import { UsuariosListComponent } from 'app/pages/usuarios/usuarios-list/usuarios-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    UsuariosComponent,
    UsuariosCreateComponent,
    UsuariosEditComponent,
    UsuariosListComponent
  ]
})

export class AdminLayoutModule {}
