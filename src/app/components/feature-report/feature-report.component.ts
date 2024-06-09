import { Component, OnInit } from '@angular/core';
import { FeatureService } from 'src/app/services/feature.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-feature-report',
  templateUrl: './feature-report.component.html',
  styleUrls: ['./feature-report.component.css']
})
export class FeatureReportComponent implements OnInit {

  features: any;

  constructor(private featureReport: ReportService) { }

  ngOnInit(): void {
    this.getFeature();
  }

  getFeature(){
    return this.featureReport.getFeature().subscribe((res) => {
      console.log(res);
      this.features = res.features;
    })
  }

}
