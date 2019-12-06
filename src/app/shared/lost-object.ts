import { AppUser } from "./app-user";
import { Image } from "./image";

export interface LostObject {
    
    id: string;

    createdById: string;

    username: string;
    
    name: string;
    
    description: string;
    
    publishTimestamp: number;
    
    lastUpdateTimestamp: number;
    
    location: any[];

    photos: Array<Image>;

    // transient
    createdByAppUser: AppUser;

}

export function resolvePrimaryPhoto(lostObject: LostObject, noPhotoUrl: string): Image {
    let photo: Image = {url: noPhotoUrl} as Image;
    if (lostObject.photos && lostObject.photos.length > 0) {
        photo = lostObject.photos[0];
    }
    return photo;
}
