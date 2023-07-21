import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, of } from "rxjs";

import { Story, User } from "./models";

@Injectable({
  providedIn: 'root'
})
export class HNService {
  private http = inject(HttpClient);

  getStory(id: string) {
    return this.http
      .get<Story>(`https://node-hnapi.herokuapp.com/item/${id}`)
      .pipe(catchError(() => of(null)));
  }  

  getStories(path: string) {
    return this.http
      .get<Story[]>(`https://node-hnapi.herokuapp.com/${path}`)
      .pipe(catchError(() => of([])));
  }

  getUser(user: string) {
    return this.http
      .get<User>(`https://hacker-news.firebaseio.com/v0/user/${user}.json`)
      .pipe(catchError(() => of(null)));
  }
}