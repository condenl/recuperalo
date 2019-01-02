import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HomeActivityIndicatorService {

    private asideROEvent: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public notBusy(): void {
        this.asideROEvent.next(false);
    }

    public getState(): Observable<boolean> {
        return this.asideROEvent.asObservable();
    }

}