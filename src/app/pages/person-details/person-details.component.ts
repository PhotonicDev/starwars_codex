import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngxs/store'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { filter, map, switchMap } from 'rxjs/operators'
import { DataState } from 'src/app/modules/people/data.state'

@Component({
  standalone: true,
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
})
export class PersonDetailsComponent implements OnInit {
  person$ = this.activatedRoute.paramMap.pipe(
    map(params => params.get('uid')),
    filter(Boolean),
    switchMap((uid: string) => this.store.select(DataState.personById(uid)))
  )
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store
  ) {}

  ngOnInit(): void {}
}
