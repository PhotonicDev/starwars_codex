import { State, Action, Selector, createSelector } from '@ngxs/store'
import { GetPeople, GetPerson, GetPlanet } from './data.actions'
import {
  Collection,
  DataContext,
  DataModel,
  Person,
  Planet,
  normalize,
} from './data'
import { Injectable } from '@angular/core'
import { DataProvider } from './data.provider'
import { tap } from 'rxjs/operators'

@State<DataModel>({
  name: 'dataModel',
  defaults: {
    people: {} as Collection<Person>,
    planets: {} as Collection<Planet>,
    pageLoaded: 0,
  },
})
@Injectable()
export class DataState {
  @Selector()
  static people(state: DataModel) {
    return Object.values(state.people) as Person[]
  }
  @Selector()
  static planets(state: DataModel) {
    return Object.values(state.planets) as Planet[]
  }
  @Selector()
  static currentPage(state: DataModel) {
    return state.pageLoaded
  }
  static personById(uid: string) {
    return createSelector([DataState.people], people =>
      people.find(person => person.uid === uid)
    )
  }
  static planetById(uid: string) {
    return createSelector([DataState.planets], planets =>
      planets.find(planet => planet.uid === uid)
    )
  }
  constructor(private readonly provider: DataProvider) {}
  @Action(GetPeople)
  getPeople(ctx: DataContext, { page }: GetPeople) {
    if (page === ctx.getState().pageLoaded) {
      return
    }
    ctx.patchState({ pageLoaded: page })
    return this.provider.getPeople(page).pipe(
      tap(result => {
        const { people } = ctx.getState()
        ctx.patchState({
          people: { ...people, ...normalize(result.results) },
        })
      })
    )
  }
  @Action(GetPerson)
  getPerson(ctx: DataContext, { uid }: GetPerson) {
    if ((ctx.getState().people as any)[uid]?.properties) {
      return
    }
    return this.provider.getPerson(uid).pipe(
      tap(result => {
        const { people } = ctx.getState()
        ctx.patchState({
          people: {
            ...people,
            [uid]: { ...result.result, ...(people as any)[uid] },
          },
        })
      })
    )
  }
  @Action(GetPlanet)
  getPlanet(ctx: DataContext, { uid }: GetPlanet) {
    if ((ctx.getState().people as any)[uid]?.properties) {
      return
    }
    return this.provider.getPlanet(uid).pipe(
      tap(result => {
        const { planets } = ctx.getState()
        ctx.patchState({
          planets: {
            ...planets,
            [uid]: { ...result.result, ...(planets as any)[uid] },
          },
        })
      })
    )
  }
}
