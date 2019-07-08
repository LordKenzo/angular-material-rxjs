import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit  {
  name = 'Angular';
  searchTerm: string;
  results;
  url = 'https://api.github.com/search/repositories?q=topic';
  @ViewChild('searchRef', {static: false}) searchRef: ElementRef;
 
  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    fromEvent(this.searchRef.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length > 2),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text: string) => 
        this.results =this.newSearch(text)
    );
  }

  newSearch(search) {
    return this.http.get(`${this.url}:${search}&sort=stars&order=desc`).pipe(
       map(res => res['items'].map(item => item.name))
    );
  }
}
