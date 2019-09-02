import { Injectable } from "@angular/core";
import { LostObject } from "~/app/shared/lost-object";
import { ImageService } from "~/app/shared/image.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";


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
                .pipe(map(result => result["value"]))
                .toPromise()
            );
    }

    /**
     * Gives default image if uid-tied image not found
     */
    public getImage(path: string): Promise<string> {
        return this.imageService.remoteUrl("lost-object/" + path + ".png")
            .then(url => url, err => this.getDefaultLostObjectImage());
    }

    public findAllByUid(uid: string): Promise<any> {
        return firebase.query(function(result) { },
        "/lostObject",
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'createdBy'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: uid
            }
        }).then(
            results => of(results)
                .pipe(map(result => result["value"]))
                .toPromise()
        );
    }

    public update(lostObject: LostObject, firebaseKey: string) {
        console.log("updating firebase key in lost-object service: ", firebaseKey);
        return firebase.setValue("/lostObject/" + firebaseKey, lostObject);
    }

    public delete(firebaseKey: string): Promise<any> {
        console.log("removing firebase key in lost-object service: ", firebaseKey);
        return firebase.remove("/lostObject/" + firebaseKey);
    }

    public findByFirebaseKey(key: string): Promise<any> {
        return firebase.getValue("/lostObject/" + key)
            .then(result => {
                let obj = {};
                obj[result.key] = result.value;
                return obj;
            });
    }

}