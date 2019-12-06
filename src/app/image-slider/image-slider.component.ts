import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { Image } from '../shared/image';

import { SwipeGestureEventData } from "ui/gestures/gestures";
import { AnimationDefinition, Animation } from 'ui/animation';
import { screen } from "platform";
import { ModalService } from '../shared/modal.service';
import { ModalSingleImageComponent } from '../modal-single-image/modal-single-image.component';

@Component({
  selector: 'ns-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  @Input()
  images: Array<Image>;

  @Input()
  swipeFnHolder;

  @Output() onSlide = new EventEmitter();

  private currentSlideNum: number = 0;
  
  private screenWidth;

  @ViewChild('slideContent', { static: false }) slideElement: ElementRef;

  constructor(private viewContainerRef: ViewContainerRef, private modalService: ModalService) {
    this.screenWidth = screen.mainScreen.widthDIPs;
  }

  ngOnInit() {
    if(this.swipeFnHolder) {
      this.swipeFnHolder.fn = this.onSwipe;
      this.swipeFnHolder.applyOn = this;
    }
  }

  onSwipe(args: SwipeGestureEventData) {
    let count = this.images.length;
    if (count < 2) {
      return;
    }

    let prevSlideNum = this.currentSlideNum;
    if (args.direction == 2) {
      this.currentSlideNum = (this.currentSlideNum + 1) % count;
    } else if (args.direction == 1) {
      this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
    } else {
      // only interested in left and right directions
      return;
    }

    const currSlide = this.slideElement.nativeElement.content.getChildAt(prevSlideNum);
    const nextSlide = this.slideElement.nativeElement.content.getChildAt(this.currentSlideNum);

    this.animate(currSlide, nextSlide, args.direction);
    this.onSlide.emit(this.images[this.currentSlideNum].uuid);
  }

  animate(currSlide, nextSlide, direction) {
    nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
    nextSlide.opacity = 1;
    var definitions = new Array<AnimationDefinition>();

    definitions.push({
      target: currSlide,
      translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
      duration: 500
    });

    definitions.push({
      target: nextSlide,
      translate: { x: 0, y: 0 },
      duration: 500
    });

    new Animation(definitions).play();
  }

  fullscreen(url: string) {
    this.modalService.show(ModalSingleImageComponent, this.viewContainerRef, url, true);
  }

}