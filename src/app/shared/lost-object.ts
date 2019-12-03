import { AppUser } from "./app-user";

export interface LostObject {
    
    createdBy: string;

    username: string;
    
    name: string;
    
    description: string;
    
    publishTimestamp: number;
    
    lastUpdateTimestamp: number;
    
    location: any[];

    photoUrl: string;

    // transient
    createdByAppUser: AppUser;

}

