import { State, Action, Selector, createSelector } from '@ngxs/store'
import { GetPeople, GetPerson, GetPlanet } from './people.actions'
import {
  Collection,
  PeopleContext,
  PeopleModel,
  Person,
  Planet,
  normalize,
} from './people'
import { Injectable } from '@angular/core'
import { PeopleProvider } from './people.provider'
import { tap } from 'rxjs/operators'

@State<PeopleModel>({
  name: 'peopleModel',
  defaults: {
    people: {} as Collection<Person>,
    planets: {} as Collection<Planet>,
    pageLoaded: 0,
  },
})
@Injectable()
export class PeopleState {
  @Selector()
  static people(state: PeopleModel) {
    return Object.values(state.people) as Person[]
  }
  @Selector()
  static planets(state: PeopleModel) {
    return Object.values(state.planets) as Planet[]
  }
  @Selector()
  static currentPage(state: PeopleModel) {
    return state.pageLoaded
  }
  static personById(uid: string) {
    return createSelector([PeopleState.people], people =>
      people.find(person => person.uid === uid)
    )
  }
  static planetById(uid: string) {
    return createSelector([PeopleState.planets], planets =>
      planets.find(planet => planet.uid === uid)
    )
  }
  constructor(private readonly provider: PeopleProvider) {}
  @Action(GetPeople)
  getPeople(ctx: PeopleContext, { page }: GetPeople) {
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
  getPerson(ctx: PeopleContext, { uid }: GetPerson) {
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
  getPlanet(ctx: PeopleContext, { uid }: GetPlanet) {
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
