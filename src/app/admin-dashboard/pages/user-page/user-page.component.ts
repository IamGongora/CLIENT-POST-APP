import { Component, inject } from '@angular/core';
import { UsersTableComponent } from '../../../users/components/users-table/users-table.component';
import { UsersService } from '../../../users/services/users.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-page',
  imports: [UsersTableComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  userservice = inject(UsersService);

  userResource = rxResource({
    request: ()=>({}),
    loader: ()=>{
      return this.userservice.getUsers();
    },
  });
}
