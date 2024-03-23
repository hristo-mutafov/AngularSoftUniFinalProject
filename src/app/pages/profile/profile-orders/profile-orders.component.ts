import { Component, OnInit } from '@angular/core';
import { ProfileSidenavComponent } from '../../../shared/components/profile/profile-sidenav/profile-sidenav.component';
import { HttpService } from '../../../core/services/http.service';
import { IOrderList } from '../../../types';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-orders',
    standalone: true,
    imports: [ProfileSidenavComponent, RouterLink],
    templateUrl: './profile-orders.component.html',
    styleUrl: '../all-profile.css',
})
export class ProfileOrdersComponent implements OnInit {
    orderList: IOrderList | null = null;
    error = false;

    constructor(private http: HttpService) {}

    ngOnInit(): void {
        this.http.getOrderList().subscribe({
            next: (list) => {
                this.orderList = list;
            },
            error: () => {
                this.error = true;
            },
        });
    }
}
