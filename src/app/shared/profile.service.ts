import { ImageService } from "~/app/shared/image.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ProfileService {

    constructor(private imageService: ImageService) { }

    /**
     * Gives default image in case uid-tied image not found
     */
    public getProfileImage(uid: string): Promise<string> {
        return this.imageService.remoteUrl("profile/" + uid + ".png")
            .catch(() => this.getDefaultImage());
    }

    public getDefaultImage(): Promise<string> {
        return this.imageService.remoteUrl("profile/default-profile.png");
    }

    public uploadImage(image: any, uid: string): Promise<string> {
        return this.imageService.uploadImage(image, 'profile/' + uid + '.png');
    }

}