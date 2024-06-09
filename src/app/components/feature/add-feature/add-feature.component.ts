import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from 'src/app/models/feature.interface';
import { FeatureService } from 'src/app/services/feature.service';
import { ProjectService } from 'src/app/services/project.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css']
})
export class AddFeatureComponent implements OnInit {

  newFeature = new Feature;
  projects: any;
  constructor(private feature:FeatureService, private router:Router, private project:ProjectService, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList(): void {
    this.project.getProject().subscribe((res) => {
      this.projects = res.projects;
    });
  }

  addFeature() {
    this.feature.addFeature(this.newFeature).subscribe((res) =>{
      console.log(res);
      this.router.navigate(['/dashboard/feature']);
      this.sidebarService.triggerReload();
    })
  }
}
