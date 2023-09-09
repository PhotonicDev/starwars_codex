import { StateContext } from '@ngxs/store'

export interface PeopleModel {
  people: Collection<Person>
  planets: Collection<Planet>
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

export type Person = Entity<PersonProperties>

export interface PlanetProperties {
  diameter: string
  rotation_period: string
  orbital_period: string
  gravity: string
  population: string
  climate: string
  terrain: string
  surface_water: string
  created: string
  edited: string
  name: string
  url: string
}

export type Planet = Entity<PlanetProperties>

export interface Entity<T> {
  properties: T
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
