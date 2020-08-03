export interface ModalAlertInterface {
  message: string;
  btnTrue: string;
  btnFalse: string;
  btnStyle: {
    btnTrue: 'alert-primary' | 'alert-secondary' | 'alert-success';
    btnFalse: 'alert-danger' | 'alert-warning';
  };
  visible?: boolean;
}
