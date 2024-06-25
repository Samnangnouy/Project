import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DesignationResponse } from 'src/app/models/designation.response';
import { DesignationService } from 'src/app/services/designation.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  designations: any;
  // loading: boolean = false;
  designationToDeleteId!: number;
  designationToDeleteName!: string;
  searchKeyword: string = '';

  constructor(private designation:DesignationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDesignation();
  }

  getDesignation(){
    // this.loading = true;
    return this.designation.getDesignations(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.designations = res.designations;
      // this.loading = false;
    });
  }

  search() {
    this.getDesignation();
  }

  setDesignationToDelete(designationId: number, designationName: string) {
    this.designationToDeleteId = designationId;
    this.designationToDeleteName = designationName;
  }

  deleteDesignation(){
    this.designation.deleteDesignation(this.designationToDeleteId).subscribe(
      (res) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true
          });
          this.getDesignation();
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
