import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Image } from '../shared/image';

@Component({
  selector: 'ns-image-reorder',
  templateUrl: './image-reorder.component.html',
  styleUrls: ['./image-reorder.component.css']
})
export class ImageReorderComponent implements OnInit {

  private images: Array<Image>;

  constructor(private params: ModalDialogParams) {
    console.log("ImageReorderComponent constructor: ", params.context);
    this.images = params.context;
  }

  ngOnInit() {
  }

  public close() {
      this.params.closeCallback();
  }

}