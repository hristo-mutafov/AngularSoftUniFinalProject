import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../core/services/http.service';
import { IOrderDetail } from '../../../types';

@Component({
    selector: 'app-order-detail',
    standalone: true,
    imports: [],
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
    private orderId: string;
    order: IOrderDetail | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpService,
    ) {
        this.orderId = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.http.getOrderDetail(this.orderId).subscribe({
            next: (order) => {
                this.order = order;
            },
            error: () => {
                this.router.navigate(['not-found']);
            },
        });
    }
}
