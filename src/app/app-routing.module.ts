import { NgModule, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router'
import { PeopleListComponent } from './pages/people-list/people-list.component'
import { Store } from '@ngxs/store'
import { GetPeople, GetPerson } from './modules/people/people.actions'
import { PersonDetailsComponent } from './pages/person-details/person-details.component'

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent,
    resolve: { data: () => inject(Store).dispatch(new GetPeople(1)) },
  },
  {
    path: ':uid',
    component: PersonDetailsComponent,
    resolve: {
      data: (route: ActivatedRouteSnapshot) =>
        inject(Store).dispatch(new GetPerson(route.params['uid'])),
    },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
