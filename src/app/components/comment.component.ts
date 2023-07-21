import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Comment } from '../models';
import { ToggleComponent } from './toggle.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [RouterLink, CommonModule, forwardRef(() => CommentComponent), ToggleComponent],
  template: `
    <div class="by">
      <a [routerLink]="['/users', comment.user]">{{comment.user}}</a>{{" "}}{{comment.time_ago}}
    </div>
    <div class="text" [innerHTML]="comment.content">
    </div>
    <ng-container *ngIf="comment.comments.length">
      <app-toggle>
        <ng-container *ngFor="let comment of comment.comments">
          <app-comment [comment]="comment" />
        </ng-container>
      </app-toggle>
    </ng-container>
  `,
  styles: [
  ]
})
export class CommentComponent {
  @Input() comment!: Comment;
}
