import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientResponse } from 'src/app/models/client.response';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: any;
  // loading: boolean = false;
  clientToDeleteId!: number;
  clientToDeleteName!: string;
  searchKeyword: string = '';

  constructor(private client: ClientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(){
    // this.loading = true;
    return this.client.getClients(this.searchKeyword).subscribe((res: any) =>{
      console.log(res);
      this.clients = res.clients;
      // this.loading = false;
    })
  }

  search() {
    this.getClient();
  }

  setClientToDelete(clientId: number, companyName: string) {
    this.clientToDeleteId = clientId;
    this.clientToDeleteName = companyName; // Assign companyName instead of client.name
  } 

  deleteClient(){
    this.client.deleteClient(this.clientToDeleteId).subscribe(
      (res) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true
          });
          this.getClient();
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
