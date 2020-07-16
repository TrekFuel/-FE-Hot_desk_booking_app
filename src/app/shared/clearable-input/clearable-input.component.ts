import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clearable-input',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{label}}</mat-label>
      <input matInput type="text" [(ngModel)]="value" [disabled]="disableStatus" (change)="onChange(value)">
      <button mat-button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: ['mat-form-field { width: 100% }'],
})
export class ClearableInputComponent {
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() disableStatus: boolean = false;
  @Output() inputMessage = new EventEmitter<string>();
  onChange(value: string) {
    this.inputMessage.emit(value);
  }
}
