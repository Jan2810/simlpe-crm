import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  isLoading = false;
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  usersCol = collection(this.firestore, 'users');

  constructor() { }

  getSingleUserRef(id: string) {
    return doc(collection(this.firestore, 'users'), id);
  }

  saveUser() {
    this.user.birthDate = new Date(this.user.birthDate).getTime();
    this.isLoading = true;
    addDoc(this.usersCol, this.user.toJSON())
      .then(() => {
        this.isLoading = false;
        console.log('this User added:', this.user);
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
