import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-order-finished',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './order-finished.component.html',
    styleUrl: './order-finished.component.css',
})
export class OrderFinishedComponent {}
