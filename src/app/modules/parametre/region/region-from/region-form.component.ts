import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { Pays, Region, RegionFormType } from '../../parametre';
import { FormBuilder, Validators } from '@angular/forms';
import { RegionService } from '../../services/region.service';
import { Observable, tap } from 'rxjs';
import { ParametreService } from '../../services/parametre.service';
import { PaysService } from '../../services/pays.service';


@Component({
    selector: 'app-region-form',
    templateUrl: './region-form.component.html',
    styleUrls: ['./region-form.component.scss']
})
export class RegionFromComponent implements OnInit {
    modalConfig: ModalConfig = {
        modalTitle: 'Ajouter un utilisateur',
        submitButtonLabel: 'Valider',
        closeButtonLabel: 'Cancel',
        size: ModalSize.Large,
    };
    paysList$: Observable<Pays[]>;
    paysListe: [] = [];

    @ViewChild('modalRegion') private modalComponent: ModalComponent;

    // Événement pour soumettre le formulaire
    @Output() formSubmitEvent = new EventEmitter<Region>();
    @Input() region?: Region;

    @ViewChild('mySelect', { static: false }) mySelect: ElementRef;
    selectedValue: string; // Utilisé pour lier la valeur sélectionnée


    constructor(
        private fb: FormBuilder,
        private regionService: RegionService,
        private paysService: PaysService,
    ) {
    }

    regionForm: RegionFormType = this.fb.group({
        nom: ['', [Validators.required]],
        pays: ['', [Validators.required]],
    });

    ngOnInit(): void {
        this.loadPaysList();

        if (!this.region) {
            return;
        }
        // Chargez la liste des pays au moment de l'initialisation du composant

        this.regionForm = this.fb.group({
            nom: [this.region.nom, Validators.required],
            pays: [this.region.pays.id, Validators.required], // Sélectionnez l'ID du pays ici
        });
    }


    get f() {
        return this.regionForm.controls;
    }

    onSubmit() {
        if (this.regionForm.invalid) {
            return;
        }
        const paysId = parseInt(this.regionForm.get('pays')?.value);
        this.paysService.find(paysId).subscribe((pays: Pays | undefined) => {
            if (pays) {
                this.regionForm.controls.pays.setValue(pays)
                this.formSubmitEvent.emit(this.regionForm.value as Region);
            }
        });

    }

    loadPaysList() {
        this.paysList$ = this.paysService.findAll();
    }


    // ngOnDestroy(): void {
    //     // Détruire Select2
    //     $('#mySelect').select2('destroy');
    // }

}
