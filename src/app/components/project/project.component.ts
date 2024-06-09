import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any;
  // loading: boolean = false;
  projectToDeleteId!: number;
  projectToDeleteName!: string;
  searchKeyword: string = '';
  selectedStatus: string = '';
  confirmationProjectName: string = '';

  constructor(private projectService: ProjectService, private toastr: ToastrService, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getProject();
  }

  // getProject(){
  //   return this.projectService.getProjects(this.searchKeyword).subscribe((res: any) =>{
  //     console.log(res);
  //     this.projects = res.projects;
  //   })
  // }

  getProject() {
    this.projectService.getProjects(this.searchKeyword, this.selectedStatus).subscribe((res: any) => {
      this.projects = res.projects;
    });
  }

  search() {
    this.getProject();
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.getProject();
  }

  setProjectToDelete(projectId: number, projectName: string) {
    this.projectToDeleteId = projectId;
    this.projectToDeleteName = projectName;
  }

  confirmDeleteProject(){
    this.projectService.deleteProject(this.projectToDeleteId, this.confirmationProjectName).subscribe(
      (res) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true
          });
          this.getProject();
          this.sidebarService.triggerReload();
          document.getElementById('exampleModal-2')?.click();
        } else {
          this.toastr.error(res.message, 'Error', {
            timeOut: 4000,
            progressBar: true
          });
        }
      },
      (error) => {
        console.error('Error:', error);
          this.toastr.error('An error occurred while deleting the feature.', 'Error', {
            timeOut: 4000,
            progressBar: true
        });
      }
    );
  }
}
