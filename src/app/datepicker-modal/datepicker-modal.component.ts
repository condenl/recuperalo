import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { DatePicker } from 'tns-core-modules/ui/date-picker/date-picker';

@Component({
  selector: 'ns-datepicker-modal',
  moduleId: module.id,
  templateUrl: './datepicker-modal.component.html',
  styleUrls: ['./datepicker-modal.component.css']
})
export class DatePickerModalComponent implements OnInit {

    private currentDate: Date;

    @ViewChild("datepicker", { static: false })
    private datePickerElement: ElementRef;

    private datepicker: DatePicker;

    constructor(private params: ModalDialogParams, private readonly changeDetectorRef: ChangeDetectorRef) {
        this.currentDate = new Date(params.context);
        setTimeout(() => this.changeDetectorRef.detectChanges(), 0);
    }

    ngOnInit() {
        this.datepicker = <DatePicker>this.datePickerElement.nativeElement;
        this.datepicker.year = this.currentDate.getFullYear();
        this.datepicker.month = this.currentDate.getMonth() + 1;
        this.datepicker.day = this.currentDate.getDate();
        this.datepicker.minDate = new Date(1975, 0, 29);
        this.datepicker.maxDate = new Date(2045, 4, 12);
    }

    public submit() {
        setTimeout(() => this.changeDetectorRef.detectChanges(), 0);
        this.params.closeCallback(<DatePicker>this.datePickerElement.nativeElement.date);
    }

    public cancel() {
        this.params.closeCallback();
    }
    
}
