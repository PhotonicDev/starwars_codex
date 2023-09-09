import { StateContext } from '@ngxs/store'

export interface PeopleModel {
  people: Collection<Person>
  pageLoaded: number
}

export type PeopleContext = StateContext<PeopleModel>

export interface PersonProperties {
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  created: string
  edited: string
  name: string
  homeworld: string
  url: string
}

export interface Person {
  properties: PersonProperties
  description: string
  uid: string
  name: string
}

export interface ServerPaginationResponse<T> {
  message: string
  total_records: number
  total_pages: number
  previous: string
  next: string
  results: T[]
}

export type Collection<T> = { key: string; value: T }

export const normalize = (arr: any[]) =>
  arr.reduce((acc, obj) => {
    acc[obj.uid] = obj
    return acc
  }, {})
