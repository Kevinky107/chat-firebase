import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private router: Router) {}

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( (result) => {
      const user = result.user;
      const name = user?.displayName;

      localStorage.setItem('user', JSON.stringify(name));
      this.router.navigate(['/chat']);
  });
    
    return this.auth;
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
