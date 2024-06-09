import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Designation } from 'src/app/models/designation.interface';
import { CategoryService } from 'src/app/services/category.service';
import { DesignationService } from 'src/app/services/designation.service';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {

  id: any;
  data: any;
  designation = new Designation();
  categories: any;
  constructor(private service:DesignationService,private category:CategoryService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getDesignationById();
    this.getCategoryList();
  }

  getDesignationById(){
    this.service.getDesignationById(this.id).subscribe(res=>{
      console.log(res);
      this.data = res;
      this.designation = this.data.designation;
    });
  }

  getCategoryList(): void {
    this.category.getCategory().subscribe((res) => {
      this.categories = res.categories;
    });
  }

  updateDesignation(){
    this.service.updateDesignation(this.id, this.designation).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/dashboard/designation']);
    })
  }

}
