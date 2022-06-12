import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  ngOnInit(): void {
  }

  user: any = {};

  constructor(public http: HttpClient, private apiService: ApiService) { }

  createUser() {
    this.apiService.registerUsers(this.user).subscribe((res) => {
    });
  }

}
