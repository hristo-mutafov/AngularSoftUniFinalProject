import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-order-price',
    standalone: true,
    imports: [],
    templateUrl: './order-price.component.html',
    styleUrl: './order-price.component.css',
})
export class OrderPriceComponent {
    @Output() finishOrder = new EventEmitter();

    buttonHandler() {
        this.finishOrder.emit();
    }
}
