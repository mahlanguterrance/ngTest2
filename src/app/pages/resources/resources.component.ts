import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ResourcesDetails } from 'src/app/models/resources-details';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  res_details: ResourcesDetails[];
  resExists = false;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.displayResources();
  }

  displayResources(): void {
    this.apiService.getResourceDetails().subscribe((data: any) => {

      this.res_details = data.data;
      console.log(this.res_details);

    });
  }

}
