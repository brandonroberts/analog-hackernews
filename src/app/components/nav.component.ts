import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
		<header class="header">
			<nav class="inner">
				<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
					<strong>HN</strong>
        </a>
				<a routerLink="/new" routerLinkActive="active">
					<strong>New</strong>
        </a>
				<a routerLink="/show" routerLinkActive="active">
					<strong>Show</strong>
        </a>
				<a routerLink="/ask" routerLinkActive="active">
					<strong>Ask</strong>
        </a>
				<a routerLink="/job" routerLinkActive="active">
					<strong>Jobs</strong>
        </a>
				<a
					class="github"
					href="http://github.com/analogjs/analog"
					target="_blank"
					rel="noreferrer"
				>
					Built with Analog
        </a>
			</nav>
		</header>  
  `
})
export class NavComponent {}