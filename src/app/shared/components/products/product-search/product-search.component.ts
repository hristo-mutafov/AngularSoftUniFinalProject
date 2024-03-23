import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-product-search',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './product-search.component.html',
    styleUrl: './product-search.component.css',
})
export class ProductSearchComponent {
    @Output() searchHandler = new EventEmitter<string>();

    submitHandler(form: NgForm) {
        const { search_query }: { search_query: string } = form.value;

        if (search_query) {
            this.searchHandler.emit(search_query);
        }
    }
}
