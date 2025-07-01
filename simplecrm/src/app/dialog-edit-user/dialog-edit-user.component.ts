import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

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
    MatDialogClose,
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User, id: string }) {
    // Jetzt hast du Zugriff auf die übergebene User-Instanz in this.data
    
    this.user = data.user;
    this.userId = data.id;

    console.log('Empfangener User:', this.user);
    console.log('Aktuelle ID:', this.userId);
  }

  getSingleUserRef(id: string) {
    return doc(collection(this.firestore, 'users'), id);
  }

  saveUser() {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
