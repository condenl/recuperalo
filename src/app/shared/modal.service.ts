import { Injectable, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';

@Injectable({
    providedIn: "root"
})
export class ModalService {

    constructor(private modalDialogService: ModalDialogService) { }

    public show(component: any, viewContainerRef: ViewContainerRef, payload: any, fullscreen: boolean) {
        return this.modalDialogService.showModal(component, {
            viewContainerRef: viewContainerRef,
            context: payload,
            fullscreen: fullscreen
            } as ModalDialogOptions);
    }

}