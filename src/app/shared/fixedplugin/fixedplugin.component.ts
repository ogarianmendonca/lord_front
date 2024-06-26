import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
  // tslint:disable-next-line:component-selector
    selector: 'fixedplugin-cmp',
    templateUrl: 'fixedplugin.component.html'
})

export class FixedPluginComponent implements OnInit {
  public sidebarColor = 'white';
  public sidebarActiveColor = 'danger';
  public state = true;

  changeSidebarColor(color) {
    const sidebar = <HTMLElement>document.querySelector('.sidebar');

    this.sidebarColor = color;
    // tslint:disable-next-line:triple-equals
    if (sidebar != undefined) {
        sidebar.setAttribute('data-color', color);
    }
  }

  changeSidebarActiveColor(color) {
    const sidebar = <HTMLElement>document.querySelector('.sidebar');
    this.sidebarActiveColor = color;
    if (sidebar !== undefined) {
        sidebar.setAttribute('data-active-color', color);
    }
  }
  
  ngOnInit() {}
}
