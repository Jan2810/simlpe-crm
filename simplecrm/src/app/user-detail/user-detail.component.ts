import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, collection, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})



export class UserDetailComponent {

  userId: string = '';
  user: User = new User();
  firestore = inject(Firestore);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    console.log('aktuelle ID =', this.userId);
    this.getUser();
  }

  getUser() {
    const userDocRef = doc(this.firestore, 'users', this.userId);

    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        this.user = new User(docSnap.data());
        console.log('User gefunden:', this.user);
      } else {
        console.log('Kein User mit dieser ID gefunden.');
      }
    }).catch((error) => {
      console.error('Fehler beim Abrufen des Users:', error);
    });
  }
}
