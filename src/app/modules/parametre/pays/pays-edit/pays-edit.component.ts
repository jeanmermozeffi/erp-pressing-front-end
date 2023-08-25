import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { ParametreService } from '../../services/parametre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pays } from '../../parametre';
import { Observable, lastValueFrom, map, of, switchMap, tap } from 'rxjs';

import Swal from 'sweetalert2';


@Component({
    selector: 'app-pays-edit',
    templateUrl: './pays-edit.component.html',
    styleUrls: ['./pays-edit.component.scss']
})
export class PaysEditComponent implements OnInit {
    errorMessage = '';
    currentPays$?: Observable<Pays | null>;
    currentId?: number;


    @Input() paysId: number;

    modalConfig: ModalConfig = {
        modalTitle: 'Ajouter un utilisateur',
        submitButtonLabel: 'Valider',
        closeButtonLabel: 'Cancel',
        isCreated: true,
        size: ModalSize.Large,
    };

    @ViewChild('modalPays') private modalComponent: ModalComponent;

    constructor(
        private serviceParametre: ParametreService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.currentPays$ = this.route.paramMap.pipe(
            map((params) => params.get('id')),
            tap((id) => this.currentId = +id!),
            switchMap((id) => {
                if (!id) {
                    return of(null);
                };
                return this.serviceParametre.find(+id);
            })
        );
    }

    async onSubmit(pays: Pays) {
        if (!pays) {
            return of(null);
        }

        try {
            await lastValueFrom(this.serviceParametre.update({ ...pays, id: this.paysId }));
            // Réussite : affichez un SweetAlert de réussite
            Swal.fire({
                title: "Succès",
                text: "La mise à jour a été effectuée avec succès.",
                icon: "success",
                confirmButtonText: "OK" // Ajoutez un bouton "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Réinitialisez le formulaire
                    // this.paysForm.reset();
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
                text: "Une erreur est survenue lors de l'enregistrement du pays, veuillez réessayer.",
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
        if (!this.paysId) {
            return;
        }

        this.currentPays$ = this.serviceParametre.find(this.paysId);

        return await this.modalComponent.open({
            modalDialogClass: 'dark-modal mw-650px',
            // fullscreen: 'lg',
            // size: 'lg',
        });
    }
}
