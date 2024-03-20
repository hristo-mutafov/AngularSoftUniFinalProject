import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-order-delivery-method',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './order-delivery-method.component.html',
    styleUrl: '../method-and-payment-common.css',
})
export class OrderDeliveryMethodComponent {
    submitDeliveryMethodOption(form: NgForm) {
        console.log(form.value);
    }

    submitDeliveryUserInformation(form: NgForm) {
        if (form.invalid) {
            return;
        }
        console.log(form.value);
    }
}
