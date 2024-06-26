import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    mostrar: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',           title: 'Dashboard',          icon: 'nc-bank',       class: '', mostrar: true },
    { path: '/user',                title: 'Meu Perfil',         icon: 'nc-single-02',  class: '', mostrar: true },
    { path: '/usuarios/listar',     title: 'Listagem de Usuários',  icon: 'nc-tile-56',    class: '', mostrar: true },
    { path: '/usuarios/cadastrar',  title: 'Cadastrar Usuário',  icon: '',    class: '' , mostrar: false},
];

@Component({
    moduleId: module.id,
  // tslint:disable-next-line:component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
