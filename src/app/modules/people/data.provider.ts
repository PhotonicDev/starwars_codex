import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Person, Planet, ServerPaginationResponse } from './data'

@Injectable({
  providedIn: 'root',
})
export class DataProvider {
  constructor(private readonly http: HttpClient) {}
  getPeople(page: number) {
    return this.http.get<ServerPaginationResponse<Person>>(
      `https://www.swapi.tech/api/people?page=${page}&limit=10`
    )
  }
  getPerson(uid: number) {
    return this.http.get<{ result: Person }>(
      `https://www.swapi.tech/api/people/${uid}`
    )
  }
  getPlanet(uid: number) {
    return this.http.get<{ result: Planet }>(
      `https://www.swapi.tech/api/planets/${uid}`
    )
  }
}
