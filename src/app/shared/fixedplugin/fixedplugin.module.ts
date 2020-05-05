import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FixedPluginComponent } from './fixedplugin.component';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ FixedPluginComponent ],
    exports: [ FixedPluginComponent ]
})

export class FixedPluginModule {}
