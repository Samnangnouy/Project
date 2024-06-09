import { Component, OnInit } from '@angular/core';
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

  constructor(private client: ClientService) { }

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

  setClientToDelete(clientId: number, clientName: string) {
    this.clientToDeleteId = clientId;
    this.clientToDeleteName = clientName;
  }

  deleteClient(){
    this.client.deleteClient(this.clientToDeleteId).subscribe(res=>{
      this.getClient();
      document.getElementById('exampleModal-2')?.click();
    });
  }

}
