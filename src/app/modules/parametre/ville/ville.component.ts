import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Ville } from '../parametre';
import { ActivatedRoute, Router } from '@angular/router';
import { VilleService } from '../services/ville.service';

@Component({
    selector: 'app-ville',
    templateUrl: './ville.component.html',
    styleUrls: ['./ville.component.scss']
})
export class VilleComponent implements OnInit {
    villes$: Observable<Ville[] | []>;

    constructor(
        private villeService: VilleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.villes$ = this.villeService.findAll();
    }

    onDelete(ville: Ville): void {
        const oldville$: Observable<Ville[]> = this.villes$;

        this.villes$ = this.villes$.pipe(
            map((villeList: Ville[]) => {
                return villeList.filter(p => p.id !== ville.id);
            })
        );
        this.villeService.delete(ville).subscribe({
            next: () => { },
            error: () => {
                this.villes$ = oldville$
            }
        })
    }
}
