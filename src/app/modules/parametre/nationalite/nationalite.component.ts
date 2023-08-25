import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Nationalite } from '../parametre';
import { NationaliteService } from '../services/nationalite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-nationalite',
    templateUrl: './nationalite.component.html',
    styleUrls: ['./nationalite.component.scss']
})
export class NationaliteComponent implements OnInit {

    nationalites$: Observable<Nationalite[] | []>;

    constructor(
        private nationaliteService: NationaliteService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.nationalites$ = this.nationaliteService.findAll();
    }

    onDelete(nationalite: Nationalite): void {
        const oldNationalite$: Observable<Nationalite[]> = this.nationalites$;

        this.nationalites$ = this.nationalites$.pipe(
            map((nationaliteList: Nationalite[]) => {
                return nationaliteList.filter(p => p.id !== nationalite.id);
            })
        );
        this.nationaliteService.delete(nationalite).subscribe({
            next: () => { },
            error: () => {
                this.nationalites$ = oldNationalite$
            }
        })
    }

}
