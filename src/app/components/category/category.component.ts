import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any;
  // loading: boolean = false;
  categoryToDeleteId!: number;
  categoryToDeleteName!: string;
  searchKeyword: string = '';

  constructor(private category:CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    // this.loading = true;
    return this.category.getCategorys(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.categories = res.categories;
      // this.loading = false;
    });
  }

  search() {
    this.getCategory();
  }

  setCategoryToDelete(categoryId: number, categoryName: string) {
    this.categoryToDeleteId = categoryId;
    this.categoryToDeleteName = categoryName;
  }

  deleteCategory(){
    this.category.deleteCategory(this.categoryToDeleteId).subscribe(res=>{
      this.getCategory();
      document.getElementById('exampleModal-2')?.click();
    });
  }

}
