import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { loaderSelector } from '../../store/selectors/usersList.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public $visible: Observable<boolean>;

  constructor(private store$: Store<AppState>) {
    this.$visible = this.store$.pipe(select(loaderSelector));
  }
}
