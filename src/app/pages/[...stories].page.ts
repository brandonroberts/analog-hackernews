import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { StoriesComponent } from '../components/stories.component';
import { HNService } from '../hn.service';
import { Story } from '../models';

const mapStories: Record<string, string> = {
	top: "news",
	new: "newest",
	show: "show",
	ask: "ask",
	job: "jobs",
};


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StoriesComponent],
  template: `
		<div class="news-view">
			<main class="news-list">
				<app-stories [stories]="stories()"/>
			</main>
		</div>
  `
})
export default class StoriesPageComponent {
  stories = signal<Story[]>([]);

  hnService = inject(HNService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    merge(
      this.router.events.pipe(
        startWith(this.router.url),
        filter(e => e instanceof NavigationEnd),
        map(() => this.router.url)),
      of(this.router.url)
    ).pipe(
      switchMap(url => this.hnService.getStories(mapStories[url.substring(1)] || 'newest')),
      takeUntilDestroyed(this.destroyRef),
      tap(stories =>  this.stories.set(stories))
    ).subscribe();
  }
}
