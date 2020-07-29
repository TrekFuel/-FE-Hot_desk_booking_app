import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clearable-input',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{label}}</mat-label>
      <input matInput
             [required]="requiredStatus"
             type="text"
             [(ngModel)]="value"
             [disabled]="disableStatus"
             (change)="onChange(value)"
             (input)="onInput(value)"
             [hasFocus]="focusStatus">
      <button mat-button *ngIf="value && !disableStatus" matSuffix mat-icon-button aria-label="Clear" (click)="clear()">
        <mat-icon>close</mat-icon>
      </button>
      <mat-error *ngIf="showError">{{errorText}}</mat-error>
    </mat-form-field>
  `,
  styles: ['mat-form-field { width: 100% }'],
})
export class ClearableInputComponent {
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() disableStatus: boolean = false;
  @Input() focusStatus: boolean = false;
  @Input() showError: boolean = false;
  @Input() errorText: string = 'Error';
  @Input() requiredStatus: boolean = true;
  @Output() inputedMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() typyingMessage: EventEmitter<string> = new EventEmitter<string>();
  onChange(value: string) {
    this.inputedMessage.emit(value);
    this.value = '';
  }

  onInput(value: string) {
    console.log(value);
    this.typyingMessage.emit(value);
    console.log(this.showError);
  }

  clear() {
    this.inputedMessage.emit('');
    this.value = '';
  }
}
