import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { AppUserService } from "~/app/shared/app-user.service";
import { switchMap } from 'rxjs/operators';
import { Observable, from, timer } from "rxjs";

export function uniqueUsernameValidator(appUserService: AppUserService, id: string): AsyncValidatorFn {
    let debounceTime = 500;
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => 
                timer(debounceTime).pipe(
                    switchMap(
                        () => from(appUserService.isUsernameTaken(control.value, id)
                            .then(isTaken => {
                                console.log("uniqueUsernameValidator " + isTaken);
                                return isTaken ? { uniqueUsername: true } as ValidationErrors : null;
                            }))
                    )
                );
}