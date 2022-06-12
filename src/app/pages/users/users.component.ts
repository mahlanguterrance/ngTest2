import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserDetails } from 'src/app/models/user-details';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users_details: UserDetails[];
  userExists = false;

  constructor(private apiService: ApiService) { }

  /**
 * Write code on Method
 *
 * @return response()
 */
  ngOnInit(): void {
    this.displayUsers();
  }

  displayUsers(): void {
    this.apiService.getUserDetails().subscribe((data: any) => {

      this.users_details = data.data;
      console.log(this.users_details);

    });
  }


}
