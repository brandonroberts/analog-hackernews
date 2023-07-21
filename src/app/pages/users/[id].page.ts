import { DatePipe, NgIf } from "@angular/common";
import { Component, Input, OnInit, inject, signal } from "@angular/core";

import { HNService } from "../../hn.service";
import { User } from "../../models";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NgIf, DatePipe],
  template: `
		<div class="user-view" *ngIf="user() as user">
			<div *ngIf="!user.error">
        <h1>User : {{user.id}}</h1>
        <ul class="meta">
          <li>
            <span class="label">Created:</span> {{user.created}}
          </li>
          <li>
            <span class="label">Karma:</span> {{user.karma}}
          </li>
          <li *ngIf="user.about" [innerHTML]="user.about" class="about">

          </li>
        </ul>
        <p class="links">
          <a href="https://news.ycombinator.com/submitted?id={{user.id}}">
            submissions
          </a>
          |
          <a href="https://news.ycombinator.com/threads?id={{user.id}}">
            comments
          </a>
        </p>
      </div>
      <div *ngIf="user!.error">
				<div>User not found</div>
      </div>
		</div>  
  `
})
export default class UserPageComponent implements OnInit {
  @Input() id!: string;
  user = signal<User | null>(null);
  hnService = inject(HNService);

  ngOnInit() {
    this.hnService.getUser(this.id)
      .subscribe(user => this.user.set(user));
  }
}