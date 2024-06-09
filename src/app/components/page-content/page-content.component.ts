import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit {

  data: any;
  project: any;
  member: any;
  task: any;
  percent: any;

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Completed', 'In Progress', 'Behind' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [ 0, 0, 0 ], label: 'Tasks' },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboard();
    this.getProject();
    this.getMember();
    this.getTask();
    this.getGraph();
  }

  getDashboard(){
    return this.dashboardService.getDashboard().subscribe((res) => {
      console.log(res);
      this.data = res;
    })
  }

  getProject(){
    return this.dashboardService.getProject().subscribe((res) => {
      console.log(res);
      this.project = res.projects;
    })
  }

  getMember(){
    return this.dashboardService.getMember().subscribe((res) => {
      console.log(res);
      this.member = res.member;
    })
  }

  getTask(){
    return this.dashboardService.getTask().subscribe((res) => {
      console.log(res);
      this.task = res.task;
    })
  }

  getGraph(){
    return this.dashboardService.getGraph().subscribe((res) => {
      console.log(res);
      // this.task = res.tasks;
      this.percent = res;
      this.updateDoughnutChart(res.completedTasks, res.inProgressTasks, res.behindTasks);
    });
  }

  updateDoughnutChart(completed: number, inProgress: number, behind: number) {
    this.doughnutChartDatasets = [
      { data: [ completed, inProgress, behind ], label: 'Tasks' },
    ];
  }

}
