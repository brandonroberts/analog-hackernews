import { Component, Input, inject, signal } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

import { HNService } from "../../hn.service";
import { Story } from "../../models";
import { CommentComponent } from "../../components/comment.component";

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, CommentComponent],
  template: `
		<div class="item-view" *ngIf="story() as story">
			<div class="item-view-header">
				<a href={{story.url}} target="_blank">
					<h1>{{story.title}}</h1>
				</a>
        <span *ngIf="" class="host">({{story.domain}})</span>
				<p class="meta">
					{{story.points}} points | by
					<a [routerLink]="['/users', story.user]">{{story.user}}</a> {{story.time_ago}}
				</p>        
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{story.comments_count ? story.comments_count + ' comments' : 'No comments yet'}}
        </p>
        <ul class="comment-children">
          <li *ngFor="let comment of story.comments" class="comment">
            <app-comment [comment]="comment"></app-comment>
          </li>
        </ul>
      </div>
    </div>
  `
})
export default class StoryPageComponent {
  story = signal<Story | null>(null);
  hnService = inject(HNService);
  @Input() id!: string;
  
  ngOnInit() {
    this.hnService.getStory(this.id)
      .subscribe(story => this.story.set(story));
  }
}