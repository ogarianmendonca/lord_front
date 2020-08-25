import { Component} from '@angular/core';

@Component({
    moduleId: module.id,
  // tslint:disable-next-line:component-selector
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
    test: Date = new Date();
}
