import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Designation } from 'src/app/models/designation.interface';
import { CategoryService } from 'src/app/services/category.service';
import { DesignationService } from 'src/app/services/designation.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {

  newDesignation = new Designation();
  categories: any;
  constructor(private category:CategoryService, private designation:DesignationService, private router:Router) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.category.getCategory().subscribe((res) => {
      this.categories = res.categories;
    });
  }

  addDesignation(){
    this.designation.addDesignation(this.newDesignation).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/dashboard/designation']);
    });
  }

}
