import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      :host {
        flex: 1;
      }
    `
  ]
})
export class AppComponent {}
