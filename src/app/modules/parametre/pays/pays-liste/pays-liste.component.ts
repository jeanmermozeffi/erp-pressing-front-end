import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { ParametreService } from '../../services/parametre.service';
import { Pays } from '../../parametre';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pays-liste',
    templateUrl: './pays-liste.component.html',
    styleUrls: ['./pays-liste.component.scss']
})
export class PaysListeComponent implements OnInit {
    pays$: Observable<Pays[] | []>;

    constructor(
        private parametreService: ParametreService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.pays$ = this.parametreService.findAll();
    }

    onDelete(pays: Pays): void {
        const oldPays$: Observable<Pays[]> = this.pays$;

        this.pays$ = this.pays$.pipe(
            map((paysList: Pays[]) => {
                return paysList.filter(p => p.id !== pays.id);
            })
        );
        this.parametreService.delete(pays).subscribe({
            next: () => { },
            error: () => {
                this.pays$ = oldPays$
            }
        })
    }
}
