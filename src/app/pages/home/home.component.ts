import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { HttpService } from '../../core/services/http.service';
import { IProductList } from '../../types';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ProductListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    products: IProductList | null = null;

    constructor(
        private http: HttpService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.http.getProductList().subscribe({
            next: (products) => (this.products = products),
            error: () => this.router.navigate(['not-found']), //TODO: redirect to 500
        });
    }
}
