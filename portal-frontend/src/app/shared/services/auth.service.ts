import {Injectable} from '@angular/core';
import {Auth, Hub} from 'aws-amplify';
import {BehaviorSubject} from "rxjs";
import {CognitoUser} from "@aws-amplify/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentAuthenticatedUser: BehaviorSubject<CognitoUser | null> = new BehaviorSubject<CognitoUser | null>(null);

  constructor() {
  }

  async signIn(username: string, password: string): Promise<boolean> {
    try {
      const user: CognitoUser = await Auth.signIn(username, password);
      this.currentAuthenticatedUser.next(user);
      return true;
    } catch (error) {
      console.log('error signing in', error);
      return false;
    }
  }

  isAuthenticated() {
    return this.currentAuthenticatedUser.getValue() !== null;
  }
}
