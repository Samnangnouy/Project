import { Component, OnInit } from '@angular/core';
import { FeatureService } from 'src/app/services/feature.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  features: any;
  featureToDeleteId!: number;
  featureToDeleteName!: string;
  searchKeyword: string = '';

  constructor(private feature:FeatureService, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getFeature();
  }

  getFeature(){
    return this.feature.getFeatures(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.features = res.features;
    });
  }

  search() {
    this.getFeature();
  }

  setFeatureToDelete(featureId: number, featureName: string) {
    this.featureToDeleteId = featureId;
    this.featureToDeleteName = featureName;
  }

  deleteFeature() {
    this.feature.deleteFeature(this.featureToDeleteId).subscribe((res) =>{
      console.log(res);
      this.getFeature();
      this.sidebarService.triggerReload();
    });
  }
}
