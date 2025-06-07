import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from './../dialog-add-user/dialog-add-user.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  users$!: Observable<User[]>;
  private sub!: Subscription;

  ngOnInit(): void {
    const usersCol = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCol, { idField: 'id' }) as Observable<User[]>;
    this.sub = this.users$.subscribe(users => {
      console.log('Users-Observable hat neue Daten:', users);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
