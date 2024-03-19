import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthStateService } from '../../state/auth-state.service';
import { Subscription } from 'rxjs';
import { CartStateService } from '../../state/cart-state.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
    isBurgerClicked = false;

    isAuthenticated = false;
    isStaff = false;
    cartCount = 0;
    subscriptions: Subscription[] = [];

    constructor(
        private authState: AuthStateService,
        private cartState: CartStateService,
    ) {}

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
        this.subscriptions.push(
            this.cartState.cartCount$.subscribe((count) => {
                this.cartCount = count;
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
