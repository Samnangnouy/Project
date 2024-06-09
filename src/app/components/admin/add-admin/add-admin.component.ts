import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.interface';
import { AdminService } from 'src/app/services/admin.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  newAdmin = new Admin();
  employees: any;
  constructor(private userService:EmployeeService, private adminService:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.userService.getEmployee().subscribe((res) => {
      this.employees = res.users;
    });
  }

  addAdmin(){
    this.adminService.addAdmin(this.newAdmin).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/dashboard/admin']);
    });
  }

}
