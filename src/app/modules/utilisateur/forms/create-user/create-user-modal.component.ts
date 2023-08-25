import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalComponent, ModalConfig, ModalSize } from "src/app/_metronic/partials";


@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html'
})
export class CreateUserModalComponent implements OnInit
{
  modalConfig: ModalConfig = {
    modalTitle: 'Ajouter un utilisateur',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
    size: ModalSize.Large,
  };

  @ViewChild('modal') private modalComponent: ModalComponent;
  // @ViewChild('content') private modalContent: TemplateRef<ModalComponent>;

  constructor() { }

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
