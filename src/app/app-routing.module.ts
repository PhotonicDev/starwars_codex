import { NgModule, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router'
import { PeopleListComponent } from './pages/people-list/people-list.component'
import { Store } from '@ngxs/store'
import {
  GetPeople,
  GetPerson,
  GetPlanet,
} from './modules/people/people.actions'
import { PersonDetailsComponent } from './pages/person-details/person-details.component'
import { PlanetDetailsComponent } from './pages/planet-details/planet-details.component'

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent,
    resolve: { data: () => inject(Store).dispatch(new GetPeople(1)) },
  },
  {
    path: 'person/:uid',
    component: PersonDetailsComponent,
    resolve: {
      data: (route: ActivatedRouteSnapshot) =>
        inject(Store).dispatch(new GetPerson(route.params['uid'])),
    },
  },
  {
    path: 'person/:person_uid/planet/:planet_uid',
    component: PlanetDetailsComponent,
    resolve: {
      data: (route: ActivatedRouteSnapshot) =>
        inject(Store).dispatch(new GetPlanet(route.params['planet_uid'])),
    },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
