import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private category:CategoryService, private toastr: ToastrService) { }

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
    this.category.deleteCategory(this.categoryToDeleteId).subscribe(
      (res) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true
          });
          this.getCategory();
          document.getElementById('exampleModal-2')?.click();
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
    )
  }

}
