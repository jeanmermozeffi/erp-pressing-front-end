import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../../type/types';
import { FAKE_USERS_DATA } from 'src/app/_fake/utilisateurs';

@Component({
  selector: 'app-utilisateur-liste',
  templateUrl: './utilisateur-liste.component.html',
  styleUrls: ['./utilisateur-liste.component.scss']
})
export class UtilisateurListeComponent implements OnInit {

  utilisateurs$?: Observable<{
    utilisateurs: Utilisateur[],
  }>

  typePath?: string | null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  getToUserProfile(id: number) {
    if (!this.typePath) {
      if (!this.typePath) {
        this.router.navigate(['./', 'profile', id, 'detail'],
          { relativeTo: this.route }
        );
        return;
      }
      this.router.navigate(['./', 'profile', id, 'detail'],
        { relativeTo: this.route }
      );
    }
  }

  ngOnInit(): void {
    this.utilisateurs$ = this.route.paramMap.pipe(
      map(params => params.get('typePath')),
      map(path => {
        this.typePath = path;
        if (!path) {
          return {
            utilisateurs: FAKE_USERS_DATA as Utilisateur[],
          }
        }
        return {
          utilisateurs: FAKE_USERS_DATA as Utilisateur[],
        }
      })
    )
  }

}
