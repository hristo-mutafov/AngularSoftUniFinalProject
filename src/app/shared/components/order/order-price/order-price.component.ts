import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-order-price',
    standalone: true,
    imports: [],
    templateUrl: './order-price.component.html',
    styleUrl: './order-price.component.css',
})
export class OrderPriceComponent {
    @Input() disabledBuyButton: boolean | null = null;
    @Input() price: string | null = null;
    @Input() errorMessage: string | null = null;
    @Output() finishOrder = new EventEmitter();

    buttonHandler() {
        this.finishOrder.emit();
    }
}
