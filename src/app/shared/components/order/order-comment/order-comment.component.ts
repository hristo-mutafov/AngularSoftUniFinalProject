import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-order-comment',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './order-comment.component.html',
    styleUrl: './order-comment.component.css',
})
export class OrderCommentComponent {
    submitComment(form: NgForm) {
        console.log(form.value);
    }
}
