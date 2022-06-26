import {Injectable} from '@angular/core';
import {Auth, Hub} from 'aws-amplify';
import {BehaviorSubject} from "rxjs";
import {CognitoUser} from "@aws-amplify/auth";
import {CognitoUserSession} from "amazon-cognito-identity-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentAuthenticatedUser: BehaviorSubject<CognitoUser | null> = new BehaviorSubject<CognitoUser | null>(null);

  constructor() {
    this.getUser();
  }

  async signIn(username: string, password: string): Promise<boolean> {
    try {
      let user = await Auth.signIn(username, password);

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        user = await Auth.completeNewPassword(
          user,
          password,
        );
      }
      this.currentAuthenticatedUser.next((user as CognitoUser));
      return true;
    } catch (error) {
      console.error('Error signing in', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    try {
      await Auth.signOut();
      this.currentAuthenticatedUser.next(null);
    } catch (error) {
      console.error('Error signing in', error);
    }
  }

  isAuthenticated() {
    return this.currentAuthenticatedUser.getValue() !== null;
  }

  async getUser() {
    try {
      const user: CognitoUser = await Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
      // console.log('USER', user);
      this.currentAuthenticatedUser.next(user);
    } catch (error) {
      console.error('Error getting user', error);
    }
  }

  async getCurrentSession() {
    try {
      const session: CognitoUserSession = await Auth.currentSession();
      // console.log('Session', session);
      // this.currentAuthenticatedUser.next(user);
    } catch (error) {
      console.error('Error getting user', error);
    }
  }
}
