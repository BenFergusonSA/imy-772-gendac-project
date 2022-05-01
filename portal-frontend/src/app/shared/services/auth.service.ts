import { Injectable } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    Hub.listen('auth', this.handleHubEvent);
  }

  handleHubEvent(data: any) {
    switch (data.payload.event) {
      case 'signIn':
        console.info('user signed in');
        break;
      case 'signUp':
        console.info('user signed up');
        break;
      case 'signOut':
        console.info('user signed out');
        break;
      case 'signIn_failure':
        console.error('user sign in failed');
        break;
      case 'tokenRefresh':
        console.info('token refresh succeeded');
        break;
      case 'tokenRefresh_failure':
        console.error('token refresh failed');
        break;
      case 'configured':
        console.info('the Auth module is configured');
    }
  }

  async signIn(username: string, password: string): Promise<boolean> {
    try {
      const user = await Auth.signIn(username, password);
      console.log('USER', user);
      return true;
    } catch (error) {
      console.log('error signing in', error);
      return false;
    }
  }
}
