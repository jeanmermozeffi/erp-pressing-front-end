import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, lastValueFrom, map, of, switchMap, tap } from 'rxjs';
import { Region } from '../../parametre';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { RegionService } from '../../services/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-region-edit',
    templateUrl: './region-edit.component.html',
    styleUrls: ['./region-edit.component.scss']
})
export class RegionEditComponent implements OnInit {
    errorMessage = '';
    currentRegion$?: Observable<Region|null>;
    currentId?: number;


    @Input() regionId: number;

    modalConfig: ModalConfig = {
        modalTitle: 'Ajouter un utilisateur',
        submitButtonLabel: 'Valider',
        closeButtonLabel: 'Cancel',
        isCreated: true,
        size: ModalSize.Large,
    };

    @ViewChild('modalRegion') private modalComponent: ModalComponent;

    constructor(
        private regionService: RegionService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.currentRegion$ = this.route.paramMap.pipe(
            map((params) => params.get('id')),
            tap((id) => this.currentId = +id!),
            switchMap((id) => {
                if (!id) {
                    return of(null);
                };
                return this.regionService.find(+id);
            })
        );
    }

    async onSubmit(region: Region) {
        if (!region) {
            return of(null);
        }

        try {
            await lastValueFrom(this.regionService.update({ ...region, id: this.regionId }));
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
        if (!this.regionId) {
            return;
        }

        this.currentRegion$ = this.regionService.find(this.regionId);

        return await this.modalComponent.open({
            modalDialogClass: 'dark-modal mw-650px',
            // fullscreen: 'lg',
            // size: 'lg',
        });
    }

}
