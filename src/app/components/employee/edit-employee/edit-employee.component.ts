import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.interface';
import { Role } from 'src/app/models/role.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id: any;
  data: any;
  employee = new Employee();
  roles: any;
  selectedFile: File | null = null;

  constructor(private service:EmployeeService, private route:ActivatedRoute, private router:Router, private role:RoleService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEmployeeById();
    this.getRoleList();
  }

  getEmployeeById(){
    this.service.getEmployeeById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.employee = this.data.user;
      if (this.employee.image) {
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        selectedImage.src = this.employee.image;
      }
    });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    // Display the selected image
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        selectedImage.src = e.target!.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getRoleList(): void {
    this.role.getRole().subscribe((res) => {
      this.roles = res.roles;
    });
  }

  // updateEmployee(){
  //   this.service.updateEmployee(this.id, this.employee).subscribe(
  //     (res) => {
  //       if(res.status === 200) {
  //         this.toastr.success(res.message, 'Success', {
  //           timeOut: 2000,
  //           progressBar: true
  //         });
  //         console.log(res);
  //         this.router.navigate(['/dashboard/employees']);
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

  updateEmployee(): void {
    const formData = new FormData();
    formData.append('name', this.employee.name);
    formData.append('email', this.employee.email);
    formData.append('password', this.employee.password);
    formData.append('password_confirmation', this.employee.password_confirmation);
    formData.append('roles', this.employee.roles);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.service.updateEmployee(this.id, formData).subscribe(res =>{
      console.log(res);
      this.router.navigate(['/dashboard/employees']);
    });
  }

}
