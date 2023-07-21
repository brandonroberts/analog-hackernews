import { Component, Input } from "@angular/core";
import { NgIf, NgFor } from "@angular/common";
import { RouterLink } from "@angular/router";

import { Story } from "../models";

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
    <ul>
      <li class="news-item" *ngFor="let story of stories">
        <span class="score">{{story.points}}</span>
        <span class="title">
            <ng-container *ngIf="story.url">
              <a href={{story.url}} target="_blank" rel="noreferrer">
                {{story.title}}
                <span class="host"> ({{story.domain}})</span>
              </a>
            </ng-container>
          
            <div *ngIf="!story.url">
              <a [routerLink]="['item', story.id]">{{story.title}}</a>
            </div>
        </span>
        <br />
        <span class="meta">
          <ng-container *ngIf="story.user">
          by <a [routerLink]="['/users', story.user]">{{story.user}}</a>
						{{story.time_ago}}
						<a [routerLink]="['/stories', story.id]">
              {{ story.comments_count ? story.comments_count + ' comments' : 'discuss' }}
            </a>            
          </ng-container>
        </span>
      </li>
    </ul>
  `
})
export class StoriesComponent {
  @Input() stories: Story[] = [];
}