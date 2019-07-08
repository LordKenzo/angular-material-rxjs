import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';
  searchTerm: string;
  results;
  url = 'https://api.github.com/search/repositories?q=topic';
  latestSearch = new Subject<string>();
  
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results = this.latestSearch.pipe(
      filter(search => search.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap( search => this.http.get(`${this.url}:${search}&sort=stars&order=desc`).pipe(
        map(res => res['items'].map(item => item.name))
      ))
    );
  }

  newSearch(search) {
    this.latestSearch.next(search);
  }
}
