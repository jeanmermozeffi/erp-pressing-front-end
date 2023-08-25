import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { VilleService } from '../../services/ville.service';
import { RegionService } from '../../services/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ville } from '../../parametre';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ville-create',
    templateUrl: './ville-create.component.html',
    styleUrls: ['./ville-create.component.scss']
})
export class VilleCreateComponent implements OnInit {
    errorMessage = '';
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
        private regionService: RegionService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

    }

    async onSubmit(ville: Ville) {
        try {
            await lastValueFrom(this.villeService.create(ville));
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
                text: "Une erreur est survenue lors de l'enregistrement de la région, veuillez réessayer.",
                icon: "error",
                confirmButtonText: "OK"
            });
            // Affichez l'erreur dans la console
            console.log(error);
        }
    }

    async openModal() {
        return await this.modalComponent.open({
            modalDialogClass: 'dark-modal mw-650px',
            // fullscreen: 'lg',
            // size: 'lg',
        });
    }

}
