import { Component, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Utilisateur } from '../../type/types';
import { ActivatedRoute, Router } from '@angular/router';
import { FAKE_USERS_DATA } from 'src/app/_fake/utilisateurs';

@Component({
  selector: 'app-utilisateur-details',
  templateUrl: './utilisateur-details.component.html',
  styleUrls: ['./utilisateur-details.component.scss']
})
export class UtilisateurDetailsComponent implements OnInit {
  utilisateur$: Observable<Utilisateur>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.utilisateur$ = this.route.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => {
        return +params.get('id')!
      }),
      map(id => {
        return FAKE_USERS_DATA.find(utilisateur => utilisateur.id === id) as Utilisateur;
      })
    )
  }

}
