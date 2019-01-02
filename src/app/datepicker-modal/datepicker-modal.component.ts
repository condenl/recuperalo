import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
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

    @ViewChild("datepicker")
    private datePickerElement: ElementRef;

    constructor(private params: ModalDialogParams) {
        console.dir(params.context);
        this.currentDate = new Date(params.context);
    }

    ngOnInit() {
        let datePicker: DatePicker = <DatePicker>this.datePickerElement.nativeElement;
        datePicker.year = this.currentDate.getFullYear();
        datePicker.month = this.currentDate.getMonth() + 1;
        datePicker.day = this.currentDate.getDate();
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2045, 4, 12);
    }

    public submit() {
        this.params.closeCallback(<DatePicker>this.datePickerElement.nativeElement.date);
    }

    public cancel() {
        this.params.closeCallback();
    }
    
}
