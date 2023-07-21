import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from './components/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
