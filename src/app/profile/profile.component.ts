import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { LoginService } from '~/app/shared/login.service';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { RouteFragment } from '~/app/route/route-fragment.enum';
import { ImageService } from '~/app/shared/image.service';
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { PageRoute } from 'nativescript-angular/router';
import { switchMap } from "rxjs/operators";
import { EventData } from 'tns-core-modules/ui/page/page';
import { AppUser } from '~/app/shared/app-user';
import { AppUserService } from '~/app/shared/app-user.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { uniqueUsernameValidator } from '~/app/shared/unique-username-validator';
import { DatePicker } from 'tns-core-modules/ui/date-picker/date-picker';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DatePickerModalComponent } from '~/app/datepicker-modal/datepicker-modal.component';
import { DateUtils } from '~/app/shared/date-utils';

var dialogs = require("tns-core-modules/ui/dialogs");
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

  private appUser: AppUser;

  private firebaseAppUserKey: string;

  private imageLoading: boolean = true;

  private editMode: boolean = false;

  private profileForm: FormGroup;

  private firebaseUser: any;

  profile_validation_messages = {
    username: [
      { type: "required", message: "Required field." },
      { type: "uniqueUsername", message: "User already taken.", cssClass:"input-error-msg-highlighted" }
    ],
    email: [
      { type: "required", message: "Required field." },
      { type: "email", message: "Wrong format." }
    ],
    phone: [
      { type: "required", message: "Required field." }
    ]
  };

  constructor(private loginService: LoginService, private appUserService: AppUserService, 
    private routeUtils: RouteUtilsService, private loaderUtils: LoaderUtilsService,
    private pageRoute: PageRoute, private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.pageRoute.activatedRoute.pipe(
      switchMap(activatedRoute => activatedRoute.data)
    ).forEach((data) => {
      this.profileImageUrl = data["profileImageUrl"];
      this.firebaseAppUserKey = Object.keys(data["appUser"])[0];
      this.appUser = data["appUser"][this.firebaseAppUserKey];
      this.firebaseUser = data["firebaseUser"];
      console.log("user firebase key: ", this.firebaseAppUserKey);
      this.profileForm = this.formBuilder.group({
        username: [this.appUser.username, Validators.required, uniqueUsernameValidator(this.appUserService, this.loginService.getCurrentUid())],
        name: this.appUser.name,
        birthday: new Date(this.appUser.birthday),
        email: [this.appUser.email, [Validators.required, Validators.email]],
        phone: [this.appUser.phone, Validators.required]
      });
    });
    this.loaderUtils.hide();
  }

  public choosePicture(): void {
    let context = imagepicker.create({ mode: "single" });
    context.authorize().then(
      () => context.present()
    ).then(selection => {
      selection.forEach(selected => {
        console.log("about to upload the image");
        this.appUserService.uploadProfileImage(selected, this.loginService.getCurrentUid())
          .then(remoteUrl => this.profileImageUrl = remoteUrl);
      })
    });
  }

  //TODO refactor
  public editProfile(save?: boolean): void {
    if (this.editMode && save) {
      if (this.profileForm.valid) {
        this.loaderUtils.show();
        this.appUserService.update(this.populateAppUser(this.appUser, this.profileForm.value), this.firebaseAppUserKey)
          .then(() => this.loaderUtils.hide());
      } else {
        dialogs.alert({
          title: "Alert",
          message: "Please correct invalid fields",
          okButtonText: "Continue"
        });
        return;
      }
    } 

    if (save != null && !save && this.profileForm.dirty) {
      dialogs.confirm({
        title: "Alert",
        message: "Your changes will be lost",
        okButtonText: "Exit",
        cancelButtonText: "Cancel",
      }).then(leave => { 
        console.log("leave value: ", leave);
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
      this.editMode = !this.editMode;
    }
  }

  public populateAppUser(appUser: AppUser, formModel: any): AppUser {
    appUser.name = formModel.name;
    appUser.username = formModel.username;
    appUser.email = formModel.email;
    appUser.phone = formModel.phone;
    if (formModel.birthday != null) {
      appUser.birthday = formModel.birthday.getTime();
    }
    return appUser;
  }

  public onProfileImageLoaded(args: any): void {
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

  public selectDateView() {
    if (this.editMode) {
      let displayDate: Date = new Date(this.appUser.birthday);
      if (displayDate == null) {
        displayDate = new Date();
      }

      this.modalDialogService.showModal(DatePickerModalComponent, {
        viewContainerRef: this.viewContainerRef,
        context: displayDate.toDateString(),
        fullscreen: false
      } as ModalDialogOptions).then((result: Date) => {
          console.log(result);
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

  get appUserJson() {
    return JSON.stringify(this.appUser);
  }

}