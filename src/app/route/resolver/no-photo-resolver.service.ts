import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LostObjectService } from '~/app/shared/lost-object.service';

@Injectable({
    providedIn: "root"
})
export class NoPhotoResolver implements Resolve<Promise<string>> {

    constructor(private lostObjectService: LostObjectService) { }

    public resolve(): Promise<string> {
        console.log("resolving no-photo picture");
        return this.lostObjectService.getDefaultLostObjectImage();
    }

}