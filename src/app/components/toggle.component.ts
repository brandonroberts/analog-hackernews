import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'toggle ' + (open() ? 'open' : '')">
      <a (click)="toggle(open())">
        {{open() ? "[-]" : "[+] comments collapsed"}}
      </a>
    </div>
    <ul class="comment-children" [ngStyle]="{display: open() ? 'block' : 'none'}">
      <ng-content></ng-content>
    </ul>
  `,
  styles: [
  ]
})
export class ToggleComponent {
  open = signal(true);

  toggle(state: boolean) {
    this.open.set(!state);
  } 
}
