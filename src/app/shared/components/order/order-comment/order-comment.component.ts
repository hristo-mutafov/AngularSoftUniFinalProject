import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-order-comment',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './order-comment.component.html',
    styleUrl: './order-comment.component.css',
})
export class OrderCommentComponent {
    @Output() handleCommentChange = new EventEmitter();

    submitComment(form: NgForm) {
        const { additional_comment }: { additional_comment: string } =
            form.value;

        this.handleCommentChange.emit(additional_comment);
    }
}
