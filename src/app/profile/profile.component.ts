import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LoginService } from '~/app/shared/login.service';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { RouteFragment } from '~/app/route/route-fragment.enum';
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { PageRoute } from 'nativescript-angular/router';
import { switchMap } from "rxjs/operators";
import { AppUser } from '~/app/shared/app-user';
import { AppUserService } from '~/app/shared/app-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { uniqueUsernameValidator } from '~/app/shared/unique-username-validator';
import { DatePickerModalComponent } from '~/app/datepicker-modal/datepicker-modal.component';
import { DateUtils } from '~/app/shared/date-utils';
import { localize } from "nativescript-localize";
import { ModalService } from '../shared/modal.service';
import { ImageService } from '../shared/image.service';

var dialogs = require("tns-core-modules/ui/dialogs");

@Component({
  selector: 'ns-profile',
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private profilePhotoUrl: string = "";

  private appUser: AppUser;

  private imageLoading: boolean = true;

  private editMode: boolean = false;

  private profileForm: FormGroup;

  private published: number;

  profile_validation_messages = {
    username: [
      { type: "required", message: localize("com.recuperalo.mobile.required-field") },
      { type: "uniqueUsername", message: localize("com.recuperalo.mobile.username-in-use"), cssClass:"input-error-msg-highlighted" }
    ],
    email: [
      { type: "required", message: localize("com.recuperalo.mobile.required-field") },
      { type: "email", message: localize("com.recuperalo.mobile.wrong-format") }
    ],
    phone: [
      { type: "required", message: localize("com.recuperalo.mobile.required-field") }
    ]
  };

  constructor(private loginService: LoginService, private appUserService: AppUserService, 
    private routeUtils: RouteUtilsService, private loaderUtils: LoaderUtilsService,
    private pageRoute: PageRoute, private formBuilder: FormBuilder,
    private modalService: ModalService, private viewContainerRef: ViewContainerRef,
    private imageService: ImageService) { }

  ngOnInit() {
    this.pageRoute.activatedRoute.pipe(
      switchMap(activatedRoute => activatedRoute.data)
    ).forEach((data: { appUser: AppUser; defaultProfilePhotoUrl: string; lostObjects: Array<any>}) => {
      this.appUser = data.appUser;
      this.profilePhotoUrl = this.appUser.profilePhotoUrl ? this.appUser.profilePhotoUrl : data.defaultProfilePhotoUrl;
      this.published = data.lostObjects ? data.lostObjects.length : 0;
      this.profileForm = this.formBuilder.group({
        username: [this.appUser.username, Validators.required, uniqueUsernameValidator(this.appUserService, this.appUser.id)],
        name: this.appUser.name,
        birthday: new Date(this.appUser.birthday),
        email: [this.appUser.email, [Validators.required, Validators.email]],
        phone: [this.appUser.phone, Validators.required]
      });
    });
    this.loaderUtils.hide();
  }

  public choosePicture(): void {
    this.imageService.openImagePicker().then(selection => 
      selection.forEach(selected => 
        this.appUserService.uploadProfilePhoto(selected, this.appUser.id)
          .then(remoteUrl => this.profilePhotoUrl = remoteUrl)
      )
    );
  }

  public saveProfile(): void {
    if (this.profileForm.valid) {
      this.loaderUtils.show();
      this.appUserService.update(this.populateAppUser(this.appUser, this.profileForm.value), this.appUser.id)
        .then(() => {
          this.editMode = false;
          this.loaderUtils.hide();
        });
    } else {
      dialogs.alert({
        title: localize("com.recuperalo.mobile.alert"),
        message: localize("com.recuperalo.mobile.correct-fields"),
        okButtonText:  localize("com.recuperalo.mobile.continue")
      });
      return;
    }
  }

  public cancelEditing(): void {
    if (this.profileForm.dirty) {
      dialogs.confirm({
        title: localize("com.recuperalo.mobile.alert"),
        message: localize("com.recuperalo.mobile.unsaved-changes"),
        okButtonText: localize("com.recuperalo.mobile.exit"),
        cancelButtonText: localize("com.recuperalo.mobile.cancel"),
      }).then(leave => {
        if (leave) {
          let aux = this.appUser.birthday;
          this.appUser.birthday = null;
          this.profileForm.reset(this.appUser);
          this.appUser.birthday = aux;
          this.birthday = new Date(this.appUser.birthday);
          this.editMode = false;
        }
      });
    } else {
      this.editMode = false;
    }
  }

  public switchView(): void {
    this.editMode = !this.editMode;
  }

  public populateAppUser(appUser: AppUser, formModel: any): AppUser {
    appUser.name = formModel.name;
    appUser.username = formModel.username;
    appUser.email = formModel.email;
    appUser.phone = formModel.phone;
    if (formModel.birthday != null) {
      appUser.birthday = formModel.birthday.getTime();
    }
    appUser.profilePhotoUrl = this.profilePhotoUrl;
    return appUser;
  }

  public onProfilePhotoLoaded(args: any): void {
    if (args.object.isLoading) {
      this.imageLoading = true;
    }
    if (args.object.isLoaded) {
      this.imageLoading = false;
    }
  }

  public selectDateView() {
    if (this.editMode) {
      let displayDate: Date;
      if (this.appUser.birthday != null) {
        displayDate = new Date(this.appUser.birthday);
      } else {
        displayDate = new Date();
      }

      this.modalService.show(DatePickerModalComponent, this.viewContainerRef, displayDate.toDateString(), false)
        .then((result: Date) => {
          if (result != null) {
            this.birthday = result;
          }
        }
      );
    }
  }

  public logOut(): void {
    this.loginService.logOut();
    this.routeUtils.routeTo("login", "slideBottom", RouteFragment[RouteFragment.LOGOUT]);
  }

  get username() {
    return this.profileForm.get("username");
  }

  get name() {
    return this.profileForm.get("name");
  }

  get birthday(): Date {
    return this.profileForm.get("birthday").value;
  }

  set birthday(date: Date) {
    this.profileForm.get("birthday").setValue(date);
  }

  get email() {
    return this.profileForm.get("email");
  }

  get phone() {
    return this.profileForm.get("phone");
  }

  get formattedBirthday() {
    if (this.birthday != null) {
      return DateUtils.toString(this.birthday);
    }
    return "";
  }

}