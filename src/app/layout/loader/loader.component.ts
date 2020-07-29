import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { loaderStateSelector } from '../../store/selectors/loader.selector';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public $visible: Observable<boolean>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.$visible = this.store$.pipe(select(loaderStateSelector));
  }
}
