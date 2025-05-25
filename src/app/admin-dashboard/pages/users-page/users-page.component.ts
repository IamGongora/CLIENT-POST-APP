import { Component, inject } from '@angular/core';
import { UsersTableComponent } from '../../../users/components/users-table/users-table.component';
import { UsersService } from '../../../users/services/users.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-page',
  imports: [UsersTableComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {

  userservice = inject(UsersService);

  userResource = rxResource({
    request: ()=>({}),
    loader: ()=>{
      return this.userservice.getUsers();
    },
  });
}
