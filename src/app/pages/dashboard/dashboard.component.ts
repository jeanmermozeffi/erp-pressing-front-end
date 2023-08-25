import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent, ModalSize } from '../../_metronic/partials';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent
{
  modalConfig: ModalConfig = {
    modalTitle: 'Ajouter un utilisateur',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
    size: ModalSize.Large,
  };

  @ViewChild('modal') private modalComponent: ModalComponent;
  @ViewChild('content') private modalContent: TemplateRef<ModalComponent>;

  constructor() { }

  async openModal() {
    return await this.modalComponent.open({
      modalDialogClass: 'dark-modal mw-650px',
      // fullscreen: 'lg',
      // size: 'lg',
    });
  }
}
