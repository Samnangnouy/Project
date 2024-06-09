import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.interface';
import { AdminService } from 'src/app/services/admin.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  id: any;
  data: any;
  admin = new Admin();
  employees: any;
  constructor(private adminService:AdminService, private userService:EmployeeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getAdminById();
    this.getEmployeeList();
  }

  getAdminById(){
    this.adminService.getAdminById(this.id).subscribe(res=>{
      console.log(res);
      this.data = res;
      this.admin = this.data.admin;
    });
  }

  getEmployeeList(): void {
    this.userService.getEmployee().subscribe((res) => {
      this.employees = res.users;
    });
  }

  updateAdmin(){
    this.adminService.updateAdmin(this.id, this.admin).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/dashboard/admin']);
    })
  }

}
