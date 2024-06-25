import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private feature:FeatureService, private sidebarService: SidebarService, private toastr: ToastrService) { }

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
    this.feature.deleteFeature(this.featureToDeleteId).subscribe(
      (res) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true
          });
          console.log(res);
          this.getFeature();
          this.sidebarService.triggerReload();
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
    );
  }
}
