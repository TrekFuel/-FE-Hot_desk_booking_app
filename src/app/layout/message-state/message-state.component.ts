import { Component } from '@angular/core';
import { messageStateAnimation } from './message-state.animation';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { MessageStateInterface } from './modules/message.interface';
import { messageSelector } from '../../store/selectors/messageState.selector';

@Component({
  selector: 'app-message-state',
  templateUrl: './message-state.component.html',
  styleUrls: ['./message-state.component.scss'],
  animations: [messageStateAnimation],
})
export class MessageStateComponent {
  public $message: Observable<MessageStateInterface>;

  constructor(private store$: Store<AppState>) {
    this.$message = this.store$.pipe(select(messageSelector));
  }
}
