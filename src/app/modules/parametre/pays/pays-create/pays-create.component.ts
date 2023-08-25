import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { Pays } from '../../parametre';
import { ParametreService } from '../../services/parametre.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pays-create',
    templateUrl: './pays-create.component.html',
    styleUrls: ['./pays-create.component.scss']
})
export class PaysCreateComponent implements OnInit {
    errorMessage = '';
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

    }

    onSubmit(pays: Pays) {
        this.serviceParametre.create(pays).subscribe({
            next: () => this.router.navigate(['../'], { relativeTo: this.route }),
            error: (error) => {
                this.errorMessage =
                    "Une erreur est survenue lors de l'enregistrement de la facture, veuillez réessayer";
                console.log(error);

            },
        });

        // Fermez la modal
        this.modalComponent.dismiss();
    }

    async openModal() {
        return await this.modalComponent.open({
            modalDialogClass: 'dark-modal mw-650px',
            // fullscreen: 'lg',
            // size: 'lg',
        });
    }

}
