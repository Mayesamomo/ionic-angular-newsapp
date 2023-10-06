import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as Rx from "rxjs";
//import { map } from 'jquery';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {
  url = "http://newsapi.org/v2/everything?";
  apiKey = "c886052d51f3460ab68c7b3bfaeb876c";
  news = new Rx.BehaviorSubject({});

  constructor(private http: HttpClient) {}
  //returns news categorys
  getNews(category) {
    return new Promise((resolve) => {
      this.http
        .get(
          "https://newsapi.org/v2/top-headlines?country=us&category=" +
            category +
            "&apiKey=c886052d51f3460ab68c7b3bfaeb876c"
        )
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  setNews(news) {
    this.news.next(news);
  }
  //get a single news
  getOneNews() {
    return this.news;
  }
  //search for news with

  searchNews(title: string): Rx.Observable<any> {
    return this.http
      .get(`${this.url}?s=${encodeURI(title)}&apikey=${this.apiKey}`)
      .pipe(map((results) => results["Search"]));
  }
}
