import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.interface';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  selectedImageSrc: string = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
  newClient: Client = new Client();
  files: File | null = null; // To store the selected file

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {}

  displaySelectedImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.files = file; // Save the file in the component

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImageSrc = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addClient(): void {
    const formData = new FormData();
    formData.append('company_name', this.newClient.company_name);
    formData.append('email', this.newClient.email);
    formData.append('phone', this.newClient.phone);
    formData.append('description', this.newClient.description);
    if (this.files) {
      formData.append('image', this.files, this.files.name);
    }

    this.clientService.addClient(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/dashboard/client']);
      },
      error: (err) => {
        console.error('Error adding client:', err);
      }
    });
  }
}