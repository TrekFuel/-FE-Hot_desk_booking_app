export interface MessageStateInterface {
  message: {
    text: string | null;
    stateAlert:
      | 'alert-primary'
      | 'alert-secondary'
      | 'alert-success'
      | 'alert-danger'
      | 'alert-warning'
      | null;
  };
  visible?: boolean;
}
