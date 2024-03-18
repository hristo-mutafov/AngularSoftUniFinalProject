import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthStateService } from '../../state/auth-state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
    //TODO: Implement cart count
    isBurgerClicked = false;

    isAuthenticated = false;
    isStaff = false;
    subscriptions: Subscription[] = [];

    constructor(private authState: AuthStateService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.authState.isAuthenticated$().subscribe((state) => {
                this.isAuthenticated = state;
            }),
        );
        this.subscriptions.push(
            this.authState.isStaff$().subscribe((state) => {
                this.isStaff = state;
            }),
        );
    }

    clickBurger(): void {
        this.isBurgerClicked = !this.isBurgerClicked;
        console.log(this.isBurgerClicked);
    }

    checkWindowSize() {
        const screenWidth = window.innerWidth;

        if (screenWidth > 768 && this.isBurgerClicked) {
            this.isBurgerClicked = false;
        }
    }

    @HostListener('window:resize')
    onResize(): void {
        this.checkWindowSize();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
