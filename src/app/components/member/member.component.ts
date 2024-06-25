import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private member:MemberService, private toastr: ToastrService) { }

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
    this.member.deleteMember(this.memberToDeleteId).subscribe(
      (res) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true
          });
          this.getMember();
          document.getElementById('exampleModal')?.click();
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
    );
  }

}
