import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class CommonService {
  private headers = new Headers({ 'Accept': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCountries(): Promise<any[]> {
    return this.http
      .get("https://restcountries.eu/rest/v2/all", this.options)
      .toPromise()
      .then(response => response.json() as any[]);
  }
}
