import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-image-reorder',
  templateUrl: './image-reorder.component.html',
  styleUrls: ['./image-reorder.component.css']
})
export class ImageReorderComponent implements OnInit {

  constructor(private params: ModalDialogParams) {
    console.log("ImageReorderComponent constructor: ", params.context);
  }

  ngOnInit() {
  }

  public saveOrder() {
    console.log("saveOrder executed");
    this.params.closeCallback();
  }

  public cancel() {
      this.params.closeCallback();
  }

}