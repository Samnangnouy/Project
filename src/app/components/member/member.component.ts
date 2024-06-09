import { Component, OnInit } from '@angular/core';
import { MemberResponse } from 'src/app/models/member.response';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  members: any;
  loading: boolean = false;
  memberToDeleteId!: number;
  memberToDeleteName!: string;
  searchKeyword: string = '';
  constructor(private member:MemberService) { }

  ngOnInit(): void {
    this.getMember();
  }

  // getMember(){
  //   this.loading = true;
  //   return this.member.getMember().subscribe((res: MemberResponse) =>{
  //     console.log(res);
  //     this.members = res.members;
  //     this.loading = false;
  //   })
  // }

  getMember(){
    // this.loading = true;
    return this.member.getMembers(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.members = res.members;
      // this.loading = false;
    });
  }

  search() {
    this.getMember();
  }

  setMemberToDelete(memberId: number, memberName: string) {
    this.memberToDeleteId = memberId;
    this.memberToDeleteName = memberName;
  }

  deleteMember(){
    this.member.deleteMember(this.memberToDeleteId).subscribe(res=>{
      this.getMember();
      document.getElementById('exampleModal-2')?.click();
    });
  }

}
