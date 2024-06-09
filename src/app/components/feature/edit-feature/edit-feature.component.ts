import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from 'src/app/models/feature.interface';
import { FeatureService } from 'src/app/services/feature.service';
import { ProjectService } from 'src/app/services/project.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.css']
})
export class EditFeatureComponent implements OnInit {

  id: any;
  data: any;
  feature = new Feature();
  projects: any;
  constructor(private service: FeatureService, private project:ProjectService, private route:ActivatedRoute, private router:Router, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getFeatureById();
    this.getProjectList();
  }

  getFeatureById(){
    this.service.getFeatureById(this.id).subscribe(res=>{
      console.log(res);
      this.data = res;
      this.feature = this.data.feature;
    })
  }

  getProjectList(): void {
    this.project.getProject().subscribe((res) => {
      this.projects = res.projects;
    });
  }

  updateFeature(){
    this.service.updateFeature(this.id, this.feature).subscribe((res) =>{
      console.log(res);
      this.router.navigate(['/dashboard/feature']);
      this.sidebarService.triggerReload();
    })
  }
}
