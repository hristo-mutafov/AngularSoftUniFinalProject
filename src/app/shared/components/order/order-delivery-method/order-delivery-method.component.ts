import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { getFutureDate } from '../../../utils';
import { DeliveryMethod, IUserInformation } from '../../../../types';

@Component({
    selector: 'app-order-delivery-method',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './order-delivery-method.component.html',
    styleUrl: '../method-and-payment-common.css',
})
export class OrderDeliveryMethodComponent {
    @Output() handleDeliveryMethodChange = new EventEmitter<DeliveryMethod>();
    @Output() handleUserInformationChange =
        new EventEmitter<IUserInformation>();

    dateAfterTwoDays = getFutureDate(2);
    dateAfterFourDays = getFutureDate(4);

    submitDeliveryMethodOption(form: NgForm) {
        const { delivery_method }: { delivery_method: DeliveryMethod } =
            form.value;
        this.handleDeliveryMethodChange.emit(delivery_method);
    }

    submitDeliveryUserInformation(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.handleUserInformationChange.emit(form.value as IUserInformation);
    }
}
