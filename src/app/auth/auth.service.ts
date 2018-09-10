import * as firebase from 'firebase'
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  private token: string;

  constructor(private router: Router){
}

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
      .then(
        response => {
          this.router.navigate(['/']);
        }
      )
  }

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
      response => {
        firebase.auth().currentUser.getIdToken().then(

          (token: string) => this.token = token
        )
        this.router.navigate(['/']);
      }
    )
      .catch(
        error => console.log(error)
      );
  }

  getToken(){
    firebase.auth().currentUser.getIdToken().then(
      token => this.token = token
    );
    return this.token;
  }

  logout(){
    this.token = null;
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }

  isAuthenticated(){
    return this.token != null;
  }
}
