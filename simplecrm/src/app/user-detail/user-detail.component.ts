import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})

export class UserDetailComponent {
  readonly dialog = inject(MatDialog);
  userId: string = '';
  user: User = new User();
  firestore = inject(Firestore);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.getUser();
  }

  getUser() {
    const userDocRef = doc(this.firestore, 'users', this.userId);

    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        this.user = new User(docSnap.data());
        this.user.birthDate = new Date(this.user.birthDate)
      }
    })
  }

  editUserDetail(): void {
    const userCopy = structuredClone(this.user);
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: {
        user: userCopy,
        id: this.userId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }

}
