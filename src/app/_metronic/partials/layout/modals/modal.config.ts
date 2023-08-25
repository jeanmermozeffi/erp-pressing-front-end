export enum ModalSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
}

export interface ModalConfig {
  modalTitle: string;
  dismissButtonLabel?: string;
  submitButtonLabel?: string;
  closeButtonLabel?: string;
  isCreated?: boolean;
  size?: ModalSize;
  shouldClose?(): Promise<boolean> | boolean;
  shouldDismiss?(): Promise<boolean> | boolean;
  onClose?(): Promise<boolean> | boolean;
  onDismiss?(): Promise<boolean> | boolean;
  disableCloseButton?(): boolean;
  disableDismissButton?(): boolean;
  hideCloseButton?(): boolean;
  hideDismissButton?(): boolean;
}
