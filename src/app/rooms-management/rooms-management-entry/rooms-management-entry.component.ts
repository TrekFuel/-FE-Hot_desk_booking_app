import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-rooms-management-entry',
  templateUrl: './rooms-management-entry.component.html',
  styleUrls: ['./rooms-management-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsManagementEntryComponent {
  @Input() $blockSelection: boolean;

  constructor() {
    // console.log(this.$blockSelection);

  }

}
