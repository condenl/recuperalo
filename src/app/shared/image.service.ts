import { Injectable } from "@angular/core";
import { RouteUtilsService } from "~/app/route/route-utils.service";

const firebase = require("nativescript-plugin-firebase");

/**
 * Provides image handling using firebase bucket storage service
 */
@Injectable({
    providedIn: "root"
})
export class ImageService {

    public getImagePath(imageAsset: any): string {
        let path: string;
        if (imageAsset.android) {
            path = imageAsset.android.toString();
        } else {
            const ios = imageAsset.ios;
            if (ios && ios.mediaType === PHAssetMediaType.Image) {
                const opt = PHImageRequestOptions.new();
                opt.version = PHImageRequestOptionsVersion.Current;
                PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(
                ios, opt, (imageData: NSData, dataUTI: string, orientation: UIImageOrientation, info: NSDictionary<any, any>) => {
                    path = info.objectForKey("PHImageFileURLKey").toString();
                });
            }
        }
        return path;
    }

    public remoteUrl(path: string, successCb?: any, errorCb?: any, finallyCb?: any): Promise<any> {
        return firebase.storage.getDownloadUrl({
            remoteFullPath: path
        }).then(
            successCb,
            error => {
                console.log("Error fetching url from firebase storage: " + error);
                if (errorCb) {
                    return errorCb();
                }
            }
        ).finally(finallyCb);
    }

    public uploadImage(imageAsset: any, remotePath: string): Promise<string> {
        return firebase.storage.uploadFile({
            remoteFullPath: remotePath,
            localFullPath: this.getImagePath(imageAsset),
            onProgress: function(status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(
            uploadedFile => this.remoteUrl(remotePath)
        ).catch(
            error => console.log("File upload error: " + error)
        );
    }

}