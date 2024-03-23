import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'wholePrice',
    standalone: true,
})
export class GetWholePricePipe implements PipeTransform {
    transform(value: string | undefined): string {
        const wholePart = value?.split('.')[0];
        return wholePart || '00';
    }
}
