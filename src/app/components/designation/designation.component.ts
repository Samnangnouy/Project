import { Component, OnInit } from '@angular/core';
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

  constructor(private designation:DesignationService) { }

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
    this.designation.deleteDesignation(this.designationToDeleteId).subscribe(res=>{
      this.getDesignation();
      document.getElementById('exampleModal-2')?.click();
    });
  }

}
