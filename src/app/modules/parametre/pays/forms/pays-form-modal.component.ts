import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ModalComponent, ModalConfig, ModalSize } from "src/app/_metronic/partials";
import { ParametreService } from "../../services/parametre.service";
import { Pays, PaysFormType } from "../../parametre";
import { BehaviorSubject, Observable, of } from "rxjs";


@Component({
    selector: 'app-pays-form-modal',
    templateUrl: './pays-form-modal.component.html'
})
export class PaysFromModalComponent implements OnInit {
    modalConfig: ModalConfig = {
        modalTitle: 'Ajouter un utilisateur',
        submitButtonLabel: 'Valider',
        closeButtonLabel: 'Cancel',
        size: ModalSize.Large,
    };

    @ViewChild('modalPays') private modalComponent: ModalComponent;

    // Événement pour soumettre le formulaire
    @Output() formSubmitEvent = new EventEmitter<Pays>();
    @Input() pays? : Pays;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    paysForm: PaysFormType = this.fb.group({
        nom: ['', [Validators.required]],
        code: ['', [Validators.required]],
        indicatif: ['', [Validators.required]]
    });

    ngOnInit(): void {
        if (!this.pays) {
            return;
        }

        this.paysForm.patchValue(this.pays);
    }

    get f() {
        return this.paysForm.controls;
    }

    onSubmit() {
        if (this.paysForm.invalid) {
            return;
        }
        console.log(this.paysForm.controls);

        this.formSubmitEvent.emit(this.paysForm.value as Pays);
    }
}
