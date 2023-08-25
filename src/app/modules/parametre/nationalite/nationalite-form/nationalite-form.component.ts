import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent, ModalConfig, ModalSize } from 'src/app/_metronic/partials';
import { Nationalite, NationaliteFormType, Pays } from '../../parametre';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { NationaliteService } from '../../services/nationalite.service';
import { PaysService } from '../../services/pays.service';

@Component({
  selector: 'app-nationalite-form',
  templateUrl: './nationalite-form.component.html',
  styleUrls: ['./nationalite-form.component.scss']
})
export class NationaliteFormComponent implements OnInit {
    modalConfig: ModalConfig = {
        modalTitle: 'Ajouter un utilisateur',
        submitButtonLabel: 'Valider',
        closeButtonLabel: 'Cancel',
        size: ModalSize.Large,
    };
    paysList$: Observable<Pays[]>;
    formError: string;

    @ViewChild('modalNationalite') private modalComponent: ModalComponent;

    // Événement pour soumettre le formulaire
    @Output() formSubmitEvent = new EventEmitter<Nationalite>();
    @Input() nationalite?: Nationalite;

    selectedValue: string; // Utilisé pour lier la valeur sélectionnée


    constructor(
        private fb: FormBuilder,
        private nationaliteService: NationaliteService,
        private paysService: PaysService,
    ) {
    }

    nationaliteForm: NationaliteFormType = this.fb.group({
        nom: ['', [Validators.required]],
        pays: ['', [Validators.required]],
    });

    ngOnInit(): void {
        this.loadPaysList();

        if (!this.nationalite) {
            return;
        }

        // Chargez la liste des pays au moment de l'initialisation du composant

        this.nationaliteForm = this.fb.group({
            nom: [this.nationalite.nom, Validators.required],
            pays: [this.nationalite.pays.id, Validators.required],
        });
    }


    get f() {
        return this.nationaliteForm.controls;
    }

    onSubmit() {
        if (this.nationaliteForm.invalid) {
            return;
        }
        const paysId = parseInt(this.nationaliteForm.get('pays')?.value);

        this.paysService.find(paysId).subscribe((pays: Pays | undefined) => {
            if (pays) {
                this.nationaliteForm.controls.pays.setValue(pays)
                this.formSubmitEvent.emit(this.nationaliteForm.value as Nationalite);
            }
        });

    }

    loadPaysList() {
        this.paysList$ = this.paysService.findAll();
    }

}
