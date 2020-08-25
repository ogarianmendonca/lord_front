import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

// Novos componentes
import { UsuariosComponent } from 'app/pages/usuarios/usuarios.component';
import { UsuariosCreateComponent } from 'app/pages/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosEditComponent } from 'app/pages/usuarios/usuarios-edit/usuarios-edit.component';
import { UsuariosListComponent } from 'app/pages/usuarios/usuarios-list/usuarios-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                component: DashboardComponent },
    { path: 'user',                     component: UserComponent },
    { path: 'table',                    component: TableComponent },
    { path: 'typography',               component: TypographyComponent },
    { path: 'icons',                    component: IconsComponent },
    { path: 'notifications',            component: NotificationsComponent },
    { path: 'upgrade',                  component: UpgradeComponent },

    // usuarios/
    {
        path: 'usuarios',
        component: UsuariosComponent,
        children: [
            { path: 'listar',          component: UsuariosListComponent },
            { path: 'cadastrar',       component: UsuariosCreateComponent },
            { path: 'editar/:id',      component: UsuariosEditComponent }
        ]
    },

];
