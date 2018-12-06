import { Injectable } from "@angular/core";

var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

@Injectable({
    providedIn: "root"
})
export class LoaderUtilsService {
    
    private loader = new LoadingIndicator();

    constructor() { }

    public show(): void {
        this.loader.show();
    }

    public hide(): void {
        this.loader.hide();
    }

}