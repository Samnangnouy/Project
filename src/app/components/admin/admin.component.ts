import { Component, OnInit } from '@angular/core';
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

  constructor(private adminService: AdminService) { }

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
    this.adminService.deleteAdmin(this.adminToDeleteId).subscribe(res=>{
      this.getAdmin();
      document.getElementById('exampleModal-2')?.click();
    });
  }

}
