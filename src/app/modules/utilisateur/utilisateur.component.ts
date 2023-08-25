import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalComponent, ModalConfig, ModalSize } from "src/app/_metronic/partials";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent implements OnInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Ajouter un utilisateur',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
    size: ModalSize.Large,
  };

  @ViewChild('modal') private modalComponent: ModalComponent;

  ngOnInit(): void {

  }

  async openModal() {
    return await this.modalComponent.open({
      modalDialogClass: 'dark-modal mw-650px',
      // fullscreen: 'lg',
      // size: 'lg',
    });
  }
}
