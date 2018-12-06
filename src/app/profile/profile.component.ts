import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '~/app/shared/login.service';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { RouteFragment } from '~/app/route/route-fragment.enum';
import { ImageService } from '~/app/shared/image.service';
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { PageRoute } from 'nativescript-angular/router';
import { switchMap } from "rxjs/operators";
import { EventData } from 'tns-core-modules/ui/page/page';
import { ProfileService } from '~/app/shared/profile.service';

var fs = require("tns-core-modules/file-system");
var imagepicker = require("nativescript-imagepicker");

@Component({
  selector: 'ns-profile',
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private profileImageUrl: string = "";

  private imageLoading: boolean = true;

  constructor(private loginService: LoginService, private profileService: ProfileService, 
    private routeUtils: RouteUtilsService, private loaderUtils: LoaderUtilsService,
    private pageRoute: PageRoute) { }

  ngOnInit() {
    this.pageRoute.activatedRoute.pipe(
      switchMap(activatedRoute => activatedRoute.data)
    ).forEach((data) => this.profileImageUrl = data["profileImageUrl"]);
    this.loaderUtils.hide();
  }

  public choosePicture(): void {
    let context = imagepicker.create({ mode: "single" });
    context.authorize().then(
      () => context.present()
    ).then(selection => {
      selection.forEach(selected => {
        console.log("about to upload the image");
        this.profileService.uploadImage(selected, this.loginService.getCurrentUid())
          .then(remoteUrl => this.profileImageUrl = remoteUrl);
      })
    });
  }

  /**
   * TODO move this method
   */
  public onImageLoaded(args: any): void {
    console.log("image loaded event");
    if (args.object.isLoading) {
      this.imageLoading = true;
      console.log("profile image isLoading");
    }
    if (args.object.isLoaded) {
      console.log("profile image isLoaded");
      this.imageLoading = false;
    }
  }

  public logOut(): void {
    this.loginService.logOut();
    this.routeUtils.routeTo("login", "slideBottom", RouteFragment[RouteFragment.LOGOUT]);
  }

}
