import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member.interface';
import { CategoryService } from 'src/app/services/category.service';
import { DesignationService } from 'src/app/services/designation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MemberService } from 'src/app/services/member.service';


@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

  id: any;
  data: any;
  member = new Member();
  categories: any;
  designations: any;
  users: any;

  constructor(private service:MemberService,private category:CategoryService,
    private designation:DesignationService, private user: EmployeeService,
    private route:ActivatedRoute, private router:Router,
     ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getMemberById();
    this.getCategoryList();
    this.getDesignationList();
    this.getUserList();
  }

  getMemberById(){
    this.service.getMemberById(this.id).subscribe(res=>{
      console.log(res);
      this.data = res;
      this.member = this.data.Member;
    });
  }

  getCategoryList(): void {
    this.category.getCategory().subscribe((res) => {
      this.categories = res.categories;
    });
  }

  getDesignationList(): void {
    this.designation.getDesignation().subscribe((res) => {
      this.designations = res.designations;
    });
  }

  getUserList(): void {
    this.user.getEmployee().subscribe((res) => {
      this.users = res.users;
    });
  }

  updateMember(){
    this.service.updateMember(this.id, this.member).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/dashboard/member']);
    })
  }

}
