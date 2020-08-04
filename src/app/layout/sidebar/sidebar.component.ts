import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BtnSidebarInterface, SidebarServices } from './sidebar.services';
import { sidebarAnimation } from './sidebar.animation';
import { Observable, Subscription } from 'rxjs';
import { AuthResponse } from '../../auth/login/models/auth-response.model';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { userSelector } from '../../store/selectors/auth.selectors';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [sidebarAnimation]
})

export class SidebarComponent implements OnInit, OnDestroy {

    btnValue: BtnSidebarInterface[];
    subscription$: Subscription;
    user$: Observable<AuthResponse>;
    userData: AuthResponse;
    // tslint:disable-next-line:variable-name
    private _bodyElement: ElementRef;

    constructor(
        private sidebarServices: SidebarServices,
        private elRef: ElementRef,
        private renderer: Renderer2,
        private store$: Store<AppState>) {
    }

    get isVisibleSidebar() {
        this.scrollVisible(this.sidebarServices.isVisible);
        return this.sidebarServices.isVisible;
    }

    closeSidebar(event): void {
        if (event.target.id === 'component' || event.target.id === 'btnSidebar') {
            this.sidebarServices.onClick();
        }
    }

    ngOnInit(): void {
        this._bodyElement = this.elRef.nativeElement.offsetParent;

        this.user$ = this.store$.select(userSelector);
        this.subscription$ = this.user$
            .subscribe((user: AuthResponse) => {
                if (user && user.token) {
                    this.userData = user;
                }
            });

        this.sidebarServices.filterButtons()
            .subscribe((btnList: BtnSidebarInterface[]) => {
                this.btnValue = btnList;
            });
    }

    scrollVisible(flag: boolean): void {
        if (flag) {
            this.renderer.setStyle(this._bodyElement, 'overflow-y', 'hidden');
        } else {
            this.renderer.removeStyle(this._bodyElement, 'overflow-y');
        }
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

}

