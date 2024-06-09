import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id: any;
  data: any;
  category = new Category();
  constructor(private service:CategoryService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getCategoryById();
  }

  getCategoryById(){
    this.service.getCategoryById(this.id).subscribe(res=>{
      console.log(res);
      this.data = res;
      this.category = this.data.category;
    });
  }

  updateCategory(){
    this.service.updateCategory(this.id, this.category).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/dashboard/category']);
    })
  }

}
