import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PagedPersonsDto} from '../models/person';

const env = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  getPersons(page = 1) {
    return this.http.get<PagedPersonsDto>(
      `${env}/v1/persons?p=${page}`
    );
  }

}
