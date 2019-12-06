import { Injectable } from "@angular/core";
import { LostObject } from "~/app/shared/lost-object";
import { ImageService } from "~/app/shared/image.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Image } from "./image";


const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class LostObjectService {

    constructor(private imageService: ImageService) { }

    public create(lostObject: LostObject): Promise<any> {
        return firebase.push("/lostObject", lostObject);
    }

    public getDefaultLostObjectImage(): Promise<string> {
        return this.imageService.remoteUrl("lost-object/insert-image.png");
    }

    public uploadImage(image: any, key: string): Promise<string> {
        return this.imageService.uploadImage(image, "lost-object/" + key + '.png');
    }

    public findAll(): Promise<any> {
        return firebase.getValue("/lostObject")
            .then(results =>
                of(results)
                .pipe(map(result => this.mapFbResultSetToLostObjects(result["value"])))
                .toPromise()
            );
    }

    mapFbResultSetToLostObjects(fbResult) {
        let lostObjects = [];
        if(fbResult) {
            for (let idx in fbResult) {
                lostObjects.push((<any>Object).assign({id: idx}, fbResult[idx]) as LostObject)
            }
        }
        return lostObjects;
    }

    public findAllById(id: string): Promise<any> {
        return firebase.query(function(result) { },
        "/lostObject",
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'createdById'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: id
            }
        }).then(
            results => of(results)
                .pipe(map(result => this.mapFbResultSetToLostObjects(result["value"])))
                .toPromise()
        );
    }

    public update(lostObject: LostObject, id: string) {
        console.log("updating firebase key in lost-object service: ", id);
        return firebase.setValue("/lostObject/" + id, lostObject);
    }

    public delete(id: string): Promise<any> {
        console.log("removing firebase key in lost-object service: ", id);
        return firebase.remove("/lostObject/" + id);
    }

    public findById(key: string): Promise<any> {
        return firebase.getValue("/lostObject/" + key)
            .then(result => this.normalize((<any>Object).assign({id: result.key}, result.value) as LostObject));
    }

    public normalize(lostObject: LostObject): LostObject {
        lostObject.photos = this.sortPhotos(lostObject.photos);
        return lostObject;
    }

    private sortPhotos(photos: Array<Image>): Array<Image> {
        if (photos) {
            photos.sort((a, b) => a.ordinal > b.ordinal ? 1 : (a.ordinal < b.ordinal ? -1 : 0));
        }
        return photos;
    }

}