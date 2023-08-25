import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, lastValueFrom, map, of, switchMap, tap } from 'rxjs';
import { Ville } from '../../parametre';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { VilleService } from '../../services/ville.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ville-edit',
    templateUrl: './ville-edit.component.html',
    styleUrls: ['./ville-edit.component.scss']
})
export class VilleEditComponent implements OnInit {
    errorMessage = '';
    currentVille$?: Observable<Ville | null>;
    currentId?: number;


    @Input() villeId: number;

    modalConfig: ModalConfig = {
        modalTitle: 'Ajouter un utilisateur',
        submitButtonLabel: 'Valider',
        closeButtonLabel: 'Cancel',
        isCreated: true,
        size: ModalSize.Large,
    };

    @ViewChild('modalVille') private modalComponent: ModalComponent;

    constructor(
        private villeService: VilleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.currentVille$ = this.route.paramMap.pipe(
            map((params) => params.get('id')),
            tap((id) => this.currentId = +id!),
            switchMap((id) => {
                if (!id) {
                    return of(null);
                };
                return this.villeService.find(+id);
            })
        );
    }

    async onSubmit(ville: Ville) {
        if (!ville) {
            return of(null);
        }

        try {
            await lastValueFrom(this.villeService.update({ ...ville, id: this.villeId }));
            // Réussite : affichez un SweetAlert de réussite
            Swal.fire({
                title: "Succès",
                text: "La mise à jour a été effectuée avec succès.",
                icon: "success",
                confirmButtonText: "OK" // Ajoutez un bouton "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Réinitialisez le formulaire
                    // this.regionForm.reset();
                    // Fermez le modal
                    this.modalComponent.dismiss();
                    // Redirigez l'utilisateur vers l'URL actuelle
                    // this.router.navigateByUrl(this.router.url);
                    // return this.router.navigate(['../'], { relativeTo: this.route, queryParams: { refresh: new Date().getTime() } });
                    window.location.reload();
                }
            });
        } catch (error) {
            // Erreur : affichez un SweetAlert d'erreur
            Swal.fire({
                title: "Erreur",
                text: "Une erreur est survenue lors de l'enregistrement du region, veuillez réessayer.",
                icon: "error",
                confirmButtonText: "OK"
            });
            // Affichez l'erreur dans la console
            console.log(error);
        }

    }

    async openModal(event: Event) {
        // Empêche la navigation par défaut du lien
        event.preventDefault();
        if (!this.villeId) {
            return;
        }

        this.currentVille$ = this.villeService.find(this.villeId);

        return await this.modalComponent.open({
            modalDialogClass: 'dark-modal mw-650px',
            // fullscreen: 'lg',
            // size: 'lg',
        });
    }

}
