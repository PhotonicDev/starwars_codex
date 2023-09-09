import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngxs/store'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { filter, map, switchMap } from 'rxjs/operators'
import { DataState } from 'src/app/modules/people/data.state'
import { Location } from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
})
export class PlanetDetailsComponent implements OnInit {
  planet$ = this.activatedRoute.paramMap.pipe(
    map(params => params.get('planet_uid')),
    filter(Boolean),
    switchMap((uid: string) => this.store.select(DataState.planetById(uid)))
  )
  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store
  ) {}

  ngOnInit(): void {}
  goBack() {
    this.location.back()
  }
}
