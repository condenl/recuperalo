import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-modal-single-image',
  templateUrl: './modal-single-image.component.html',
  styleUrls: ['./modal-single-image.component.css']
})
export class ModalSingleImageComponent implements OnInit {

  private url: string;

  constructor(private params: ModalDialogParams) {
    console.log("ModalSingleImageComponent constructor: ", params.context);
    this.url = params.context;
  }

  ngOnInit() {
  }

}
