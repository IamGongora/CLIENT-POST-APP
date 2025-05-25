import { Component, effect, inject, input, linkedSignal } from '@angular/core';
import { UsersService } from '../../../users/services/users.service';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  id = input.required<string>();
  userService = inject (UsersService);
  router = inject(Router);
  userId = linkedSignal(this.id);
  userResource = rxResource({
    request: ()=>({id: this.userId()}),
    loader: ({request})=>{
      return this.userService.getUser(request.id);
    },
  });
  redirecEffect = effect(()=>{
    if (this.userResource.error()) {
      this.router.navigate(['/dashboard/users']);
    }
  });
}
