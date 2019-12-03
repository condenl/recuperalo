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

export function resolvePrimaryPhotoUrl(lostObject: LostObject, noPhotoUrl: string): string {
    let photoUrl: string = noPhotoUrl;
    if (lostObject.photos && lostObject.photos.length > 0) {
        photoUrl = lostObject.photos[0].url;
    }
    return photoUrl;
}
