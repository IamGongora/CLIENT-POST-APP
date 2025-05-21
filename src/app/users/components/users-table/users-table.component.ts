import { Component, input } from '@angular/core';

@Component({
  selector: 'user-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  users = input.required<any>();
}
