import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  projects: any;
  constructor(private projectReport: ReportService) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(){
    return this.projectReport.getProject().subscribe((res) => {
      console.log(res);
      this.projects = res.projects;
    })
  }

}
