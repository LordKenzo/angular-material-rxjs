import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  searchTerm: string;
  results;
  url = 'https://api.github.com/search/repositories?q=topic';

  constructor(private http: HttpClient) {}

  // Con questo approccio posso avere problemi con le API di github perchè richiedo dati in maniera continua!!!

  newSearch(search) {
    this.results = this.http.get(`${this.url}:${search}&sort=stars&order=desc`).pipe(
      map(res => res['items'].map(item => item.name))
    );
  }
}
