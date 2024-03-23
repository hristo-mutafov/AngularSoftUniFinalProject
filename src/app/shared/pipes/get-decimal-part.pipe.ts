import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'decimalPrice',
    standalone: true,
})
export class GetDecimalPartPipe implements PipeTransform {
    transform(value: string | undefined): string {
        const decimalPart = value?.split('.')[1];
        return decimalPart || '00';
    }
}
