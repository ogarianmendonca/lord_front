import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: '/user',          title: 'Meu Perfil',      icon: 'nc-single-02',  class: '' },
    { path: '/icons',         title: 'Ícones',             icon: 'nc-diamond',    class: '' },
    { path: '/notifications', title: 'Notificações',     icon: 'nc-bell-55',    class: '' },
    { path: '/table',         title: 'Tabelas e Listas',        icon: 'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Tipografia',        icon: 'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon: 'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
