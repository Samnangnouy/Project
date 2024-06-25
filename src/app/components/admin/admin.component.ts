import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins: any;
  // loading: boolean = false;
  adminToDeleteId!: number;
  adminToDeleteName!: string;
  searchKeyword: string = '';

  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin(){
    // this.loading = true;
    return this.adminService.getAdmins(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.admins = res.admins;
      // this.loading = false;
    });
  }

  search() {
    this.getAdmin();
  }

  setDesignationToDelete(adminId: number, adminName: string) {
    this.adminToDeleteId = adminId;
    this.adminToDeleteName = adminName;
  }

  deleteDesignation(){
    this.adminService.deleteAdmin(this.adminToDeleteId).subscribe(
      (res) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true
          });
          this.getAdmin();
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
  }

}
