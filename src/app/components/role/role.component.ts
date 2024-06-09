import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  searchKeyword: string = '';
  loading: boolean = false;
  roles: any;
  roleToDeleteId!: number;
  roleToDeleteName!: string;

  constructor(private role:RoleService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    // Fetch roles regardless of permission
    this.role.getRoles(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.roles = res.roles;

      // If the user doesn't have permission to list roles, display an error message
      // if (!this.authService.hasPermission('role-list')) {
      //   this.toastr.error('You do not have permission to see roles list.', 'Unauthorized', {
      //     timeOut: 4000,
      //     progressBar: true
      //   });
      // }
    });
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  search() {
    this.getRole();
  }

  setRoleToDelete(roleId: number, roleName: string) {
    this.roleToDeleteId = roleId;
    this.roleToDeleteName = roleName;
  }

  deleteRole() {
    // Check if the user has permission to delete a role
    if (this.authService.hasPermission('role-delete')) {
      this.role.deleteRole(this.roleToDeleteId).subscribe(
        (res) => {
          if (res.status === 200) {
            this.toastr.success(res.message, 'Success', {
              timeOut: 2000,
              progressBar: true
            });
            this.getRole(); // Refresh roles after deletion
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
    } else {
      // Display error message if user doesn't have permission to delete a role
      this.toastr.error('You do not have permission to delete a role.', 'Unauthorized', {
        timeOut: 4000,
        progressBar: true
      });
    }
  }

}
