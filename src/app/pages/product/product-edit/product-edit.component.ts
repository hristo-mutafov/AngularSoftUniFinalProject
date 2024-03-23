import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

import { HttpService } from '../../../core/services/http.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { IProductCreate, IProductDetail } from '../../../types';
import {
    FIELDS_ARE_REQUIRED,
    NOT_CORRECT_FILLED_FILEDS,
    SERVER_ERROR_500,
} from '../../../shared/constants';
import { mapCategory } from '../../../shared/utils';

@Component({
    selector: 'app-product-edit',
    standalone: true,
    imports: [LoaderComponent, FormsModule],
    templateUrl: './product-edit.component.html',
    styleUrl: '../shared-prodcut-styles.css',
})
export class ProductEditComponent {
    private product_id: number | null = null;
    isLoading = true;
    product: IProductDetail | null = null;
    mappedCategory: string | null = null;
    errorMessage: string | null = null;
    editLoading: boolean | null = null;

    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private router: Router,
    ) {
        this.product_id = Number(this.route.snapshot.params['id']);

        this.http.getProduct(this.product_id).subscribe({
            next: (product) => {
                this.product = product;
                this.mappedCategory = mapCategory(product.category);
                this.isLoading = false;
            },
            error: () => {
                this.router.navigate(['not-found']);
            },
        });
    }

    formHandler(form: NgForm) {
        if (form.invalid) {
            this.errorMessage = FIELDS_ARE_REQUIRED;
            return;
        }

        this.http
            .editProduct(
                this.product_id!,
                form.value as Partial<IProductCreate>,
            )
            .subscribe({
                next: () => {
                    this.editLoading = false;
                    this.router.navigate(['home']);
                },
                error: (err: HttpErrorResponse) => {
                    console.log(err);

                    this.editLoading = false;
                    if (err.status < 500) {
                        this.errorMessage = NOT_CORRECT_FILLED_FILEDS;
                    } else {
                        this.errorMessage = SERVER_ERROR_500;
                    }
                },
            });
    }
}
