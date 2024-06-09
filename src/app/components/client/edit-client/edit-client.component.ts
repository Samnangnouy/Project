import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: any;
  data: any;
  client = new Client();
  selectedFile: File | null = null;

  constructor(private clientService: ClientService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getClientById();
  }

  getClientById(){
    this.clientService.getClientById(this.id).subscribe(res=>{
      console.log(res);
      this.data = res;
      this.client = this.data.client;
      // If the product has an image, display it
      if (this.client.image) {
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        selectedImage.src = this.client.imageUrl;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    // Display the selected image
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        selectedImage.src = e.target!.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // updateProduct(){
  //   const formData = new FormData();
  //   formData.append('name', this.product.name);
  //   if (this.selectedFile) {
  //     formData.append('image', this.selectedFile, this.selectedFile.name);
  //   }
  //   this.service.updateProduct(this.id, formData).subscribe(res =>{
  //     console.log(res);
  //   });
  // }

  updateClient(){
    const formData = new FormData();
    formData.append('company_name', this.client.company_name);
    formData.append('email', this.client.email);
    formData.append('phone', this.client.phone);
    formData.append('description', this.client.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.clientService.updateClient(this.id, formData).subscribe(res =>{
      console.log(res);
      this.router.navigate(['/dashboard/client']);
    });
  }
}
