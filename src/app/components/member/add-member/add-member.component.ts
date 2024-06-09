import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.interface';
import { CategoryService } from 'src/app/services/category.service';
import { DesignationService } from 'src/app/services/designation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  newMember = new Member();
  categories: any;
  designations: any;
  users: any;

  constructor(private member:MemberService, private router:Router,
    private category: CategoryService, private designation: DesignationService,
    private user: EmployeeService
    ) { }

  ngOnInit(): void {
    this.getCategory();
    // this.getDesignation();
    this.getUser();
  }

  addMember(){
    return this.member.addMember(this.newMember).subscribe(res =>{
      console.log(res);
      this.router.navigate(['/dashboard/member']);
    })
  }

  getCategory(){
    return this.category.getCategory().subscribe((res) =>{
      console.log(res);
      this.categories = res.categories;
    })
  }

  // getDesignation(){
  //   return this.designation.getDesignation().subscribe((res) =>{
  //     console.log(res);
  //     this.designations = res.designations;
  //   })
  // }

  getUser(){
    return this.user.getEmployee().subscribe((res) =>{
      console.log(res);
      this.users = res.users;
    })
  }

  onCategoryChange(categoryId: number) {
    this.newMember.designation_id = null; // Reset designation field
    if (categoryId) {
      this.designation.getDesignationsByCategory(categoryId).subscribe((res) => {
        this.designations = res.designations;
      });
    } else {
      this.designations = [];
    }
  }

}
