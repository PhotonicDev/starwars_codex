import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngxs/store'
import { DataState } from 'src/app/modules/people/data.state'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { Observable, first } from 'rxjs'
import { Person } from 'src/app/modules/people/data'
import { RouterModule } from '@angular/router'
import { GetPeople } from 'src/app/modules/people/data.actions'

@Component({
  standalone: true,
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  imports: [CommonModule, MatListModule, RouterModule, MatButtonModule],
})
export class PeopleListComponent {
  people$: Observable<Person[]> = this.store.select(DataState.people)
  currentPage$: Observable<number> = this.store.select(DataState.currentPage)
  constructor(private readonly store: Store) {}
  loadMoreItems() {
    this.currentPage$.pipe(first()).subscribe(page => {
      this.store.dispatch(new GetPeople(page + 1))
    })
  }
}
