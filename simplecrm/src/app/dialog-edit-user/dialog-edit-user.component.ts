import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogActions,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);
  usersCol = collection(this.firestore, 'users');
  readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  isLoading = false;
  user: User;
  userId: string;
  docRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User, id: string }) {

    this.user = data.user;
    this.userId = data.id;
    this.user.id = data.id
    this.docRef = doc(this.usersCol, data.id);
  }

  getSingleUserRef(id: string) {
    return doc(collection(this.firestore, 'users'), id);
  }

  saveUser() {
    this.isLoading = true;

    updateDoc(this.docRef, {
      ...this.user
    }).then(() => {
      this.isLoading = false
      this.dialogRef.close(this.user);
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
