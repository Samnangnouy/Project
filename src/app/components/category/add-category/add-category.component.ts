import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  newCategory = new Category();
  constructor(private category:CategoryService, private router:Router) { }

  ngOnInit(): void {
  }

  addCategory(){
    return this.category.addCategory(this.newCategory).subscribe(res =>{
      console.log(res);
      this.router.navigate(['/dashboard/category']);
    })
  }

}
