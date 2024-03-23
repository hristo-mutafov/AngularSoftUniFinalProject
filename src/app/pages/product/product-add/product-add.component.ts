import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import {
    FIELDS_ARE_REQUIRED,
    NOT_CORRECT_FILLED_FILEDS,
    SERVER_ERROR_500,
} from '../../../shared/constants';
import { IProductCreate } from '../../../types';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-add',
    standalone: true,
    imports: [FormsModule, LoaderComponent],
    templateUrl: './product-add.component.html',
    styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
    //TODO: Extract the same buttons if it is possible
    selectedFile: File | null = null;
    encodedFile: string | null = null;
    fileExtension: string | null = null;
    errorMessage: string | null = null;
    isLoading = false;

    constructor(
        private http: HttpService,
        private router: Router,
    ) {}

    formHandler(form: NgForm) {
        if (form.invalid || !this.encodedFile) {
            this.errorMessage = FIELDS_ARE_REQUIRED;
            return;
        }
        this.isLoading = true;

        const formData: IProductCreate = form.value;
        formData.category = Number(formData.category);
        formData.price = Number(formData.price);
        formData.image = this.encodedFile!;
        formData.extension = this.fileExtension!;

        this.http.createProduct(formData).subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['home']);
            },
            error: (err: HttpErrorResponse) => {
                this.isLoading = false;
                if (err.status < 500) {
                    this.errorMessage = NOT_CORRECT_FILLED_FILEDS;
                } else {
                    this.errorMessage = SERVER_ERROR_500;
                }
            },
        });
    }

    fileOnChangeHandler(event: any) {
        this.selectedFile = event.target.files[0] as File;

        if (this.selectedFile) {
            this.getFileExtension();
            this.convertToBase64();
        }
    }

    convertToBase64(): void {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            const parts = base64String.split(',');

            this.encodedFile = parts[1];
        };
        reader.readAsDataURL(this.selectedFile!);
    }

    getFileExtension(): void {
        if (this.selectedFile) {
            const fileName = this.selectedFile.name;
            const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
            this.fileExtension = extension.toLowerCase();
        }
    }
}
