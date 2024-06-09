import { Component, OnInit, } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeResponse } from 'src/app/models/employee.response';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: any;
  loading: boolean = false;
  employeeToDeleteId!: number;
  employeeToDeleteName!: string;
  searchKeyword: string = '';
  
  constructor(private employee: EmployeeService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  getEmployee(){
    return this.employee.getEmployees(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.employees = res.users;
    });
  }

  search() {
    this.getEmployee();
  }

  setEmployeeToDelete(employeeId: number, employeeName: string) {
    this.employeeToDeleteId = employeeId;
    this.employeeToDeleteName = employeeName;
  }

  deleteEmployee(){
    if (this.authService.hasPermission('role-delete')) {
      this.employee.deleteEmployee(this.employeeToDeleteId).subscribe(
        (res) => {
          if (res.status === 200) {
            this.toastr.success(res.message, 'Success', {
              timeOut: 2000,
              progressBar: true
            });
            this.getEmployee();
            document.getElementById('exampleModal')?.click();
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
    }else {
      // Display error message if user doesn't have permission to delete a role
      this.toastr.error('You do not have permission to delete a user.', 'Unauthorized', {
        timeOut: 4000,
        progressBar: true
      });
    }
  }

}
