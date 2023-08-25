import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { Region, Ville, VilleFormType } from '../../parametre';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { RegionService } from '../../services/region.service';
import { VilleService } from '../../services/ville.service';

@Component({
    selector: 'app-ville-form',
    templateUrl: './ville-form.component.html',
    styleUrls: ['./ville-form.component.scss']
})
export class VilleFormComponent implements OnInit {
    modalConfig: ModalConfig = {
        modalTitle: 'Ajouter un utilisateur',
        submitButtonLabel: 'Valider',
        closeButtonLabel: 'Cancel',
        size: ModalSize.Large,
    };
    regionList$: Observable<Region[]>;

    @ViewChild('modalVille') private modalComponent: ModalComponent;

    // Événement pour soumettre le formulaire
    @Output() formSubmitEvent = new EventEmitter<Ville>();
    @Input() ville?: Ville;

    selectedValue: string; // Utilisé pour lier la valeur sélectionnée


    constructor(
        private fb: FormBuilder,
        private regionService: RegionService,
        private villeService: VilleService,
    ) {
    }

    villeForm: VilleFormType = this.fb.group({
        nom: ['', [Validators.required]],
        region: ['', [Validators.required]],
    });

    ngOnInit(): void {
        this.loadPaysList();

        if (!this.ville) {
            return;
        }
        // Chargez la liste des pays au moment de l'initialisation du composant

        this.villeForm = this.fb.group({
            nom: [this.ville.nom, Validators.required],
            region: [this.ville.region.id, Validators.required], // Sélectionnez l'ID du pays ici
        });
    }


    get f() {
        return this.villeForm.controls;
    }

    onSubmit() {
        if (this.villeForm.invalid) {
            return;
        }
        const villeId = parseInt(this.villeForm.get('region')?.value);

        this.regionService.find(villeId).subscribe((region: Region | undefined) => {
            if (region) {
                this.villeForm.controls.region.setValue(region)
                this.formSubmitEvent.emit(this.villeForm.value as Ville);
            }
        });

    }

    loadPaysList() {
        this.regionList$ = this.regionService.findAll();
    }

}
