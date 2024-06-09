import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.interface';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MemberService } from 'src/app/services/member.service';
import { ProjectService } from 'src/app/services/project.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  selectedImageSrc: string = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
  newProject: Project = new Project();
  files: File | null = null; // To store the selected file
  admins: any;
  clients: any;
  members: any;
  selectedUsers: any[] = [];
  tempSelectedUsers: any[] = []; // Temporary selection in the modal
  searchKeyword: string = '';

  constructor(private project: ProjectService, private router:Router, private admin: AdminService,
    private client: ClientService,
    private member: MemberService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.getAdmin();
    this.getClient();
    this.getMember();
  }

  getAdmin(){
    return this.admin.getAdmin().subscribe((res) =>{
      console.log(res);
      this.admins = res.admins;
    })
  }

  getClient(){
    return this.client.getClient().subscribe((res) =>{
      console.log(res);
      this.clients = res.clients;
    })
  }

  getMember(){
    return this.member.getMembers(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.members = res.members;
    })
  }

  search() {
    this.getMember();
  }

  displaySelectedImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.files = file; // Save the file in the component

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImageSrc = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addUserToTempTeam(member: any) {
    if (!this.tempSelectedUsers.some(user => user.id === member.id)) {
      this.tempSelectedUsers.push(member); // Add the user to the temporary selected users array
    }
  }

  inviteUsers() {
    this.tempSelectedUsers.forEach(member => {
      if (!this.selectedUsers.some(user => user.id === member.id)) {
        this.selectedUsers.push(member); // Add the user to the final selected users array
        this.newProject.member_id.push(member.id); // Add the user's id to the project's user_ids array
      }
    });
    // this.tempSelectedUsers = []; // Clear temporary selection after inviting
  }

  // addProject(): void {
  //   const formData = new FormData();
  //   formData.append('name', this.newProject.name);
  //   formData.append('status', this.newProject.status);
  //   formData.append('priority', this.newProject.priority);
  //   formData.append('start_date', this.newProject.start_date);
  //   formData.append('end_date', this.newProject.end_date);
  //   formData.append('admin_id', this.newProject.admin_id);
  //   formData.append('client_id', this.newProject.client_id);
  //   formData.append('member_id', this.newProject.member_id);
  //   formData.append('description', this.newProject.description);
  //   if (this.files) {
  //     formData.append('image', this.files, this.files.name);
  //   }

  //   this.project.addProject(formData).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.router.navigate(['/dashboard/client']);
  //     },
  //     error: (err) => {
  //       console.error('Error adding client:', err);
  //     }
  //   });
  // }

  addProject(): void {
    const formData = new FormData();
    formData.append('name', this.newProject.name);
    formData.append('status', this.newProject.status);
    formData.append('priority', this.newProject.priority);
    formData.append('start_date', this.newProject.start_date);
    formData.append('end_date', this.newProject.end_date);
    formData.append('admin_id', this.newProject.admin_id);
    formData.append('client_id', this.newProject.client_id);
    formData.append('description', this.newProject.description);
    
    // Append each member_id separately
    this.newProject.member_id.forEach(id => {
      formData.append('member_id[]', id);
    });
    
    if (this.files) {
      formData.append('image', this.files, this.files.name);
    }
  
    this.project.addProject(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/dashboard/projects']);
        this.sidebarService.triggerReload();
      },
      error: (err) => {
        console.error('Error adding project:', err);
      }
    });
  }
  

  // addProject() {
  //   this.project.addProject(this.newProject).subscribe(
  //     (res) => {
  //       if (res.status === 200) {
  //         this.toastr.success(res.message, 'Success', {
  //           timeOut: 2000,
  //           progressBar: true
  //         });
  //         this.router.navigate(['/dashboard/projects']);
  //       } else {
  //         this.toastr.error(res.message, 'Error', {
  //           timeOut: 4000,
  //           progressBar: true
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       this.toastr.error('An error occurred while creating the project.', 'Error', {
  //         timeOut: 4000,
  //         progressBar: true
  //       });
  //     }
  //   );
  // }

}
