import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
