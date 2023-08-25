import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Region } from '../parametre';
import { RegionService } from '../services/region.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  regions$: Observable<Region[] | []>;

  constructor(
    private regionService: RegionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.regions$ = this.regionService.findAll();
  }

  onDelete(region: Region): void {
    const oldRegion$: Observable<Region[]> = this.regions$;

    this.regions$ = this.regions$.pipe(
      map((regionList: Region[]) => {
        return regionList.filter(p => p.id !== region.id);
      })
    );
    this.regionService.delete(region).subscribe({
      next: () => { },
      error: () => {
        this.regions$ = oldRegion$
      }
    })
  }
}
