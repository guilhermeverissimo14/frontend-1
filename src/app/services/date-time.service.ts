import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor(private datePipe: DatePipe) {}

  formatarData(date: Date, format: string): string {
    return this.datePipe.transform(date, format);
  }

  formatarHora(date: Date, format: string): string {
    return this.datePipe.transform(date, format);
  }

}
