import { Component, OnInit,ViewChild } from '@angular/core';
import { ClientService } from 'src/app/ClientLogin/ClientLogin.service';
import {MatTableDataSource} from '@angular/material/table'
import {MatSort} from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  fileToUpload:File;
  fileUrl:string = "";
 
  tickets:MatTableDataSource<any>;
  data:any;
  displayedColumns: string[] = ['id','request', 'priority', 'travelcity', 'fromloc','submitdate','startdate','enddate','project','status'];
 
  constructor(private clientservice: ClientService,
    private toastr:ToastrService) { 
  }
 
  @ViewChild(MatSort) sort: MatSort;
 
  ngOnInit(){
    this.getTickets();
  }
 
  populatedata(ticket){
    this.data = ticket;
  }
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.tickets.filter = filterValue;
  }
 
  getTickets(){
    this.clientservice.getAllTickets()
    .subscribe(data => {this.tickets =new MatTableDataSource(JSON.parse(data));      
      this.tickets.sort = this.sort;},error => console.log(error));
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
 
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.fileUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
 
  updatestatus(id){
    let changedstatus = (<HTMLInputElement>document.querySelector('#changedstatus')).value;
    this.clientservice.updatestatus(changedstatus,id).subscribe(data=> window.location.reload(),error => console.log())
  }
 
  savechanges(id){
    let changedstatus = (<HTMLInputElement>document.querySelector('#changedstatus')).value
    this.data.status = changedstatus;
    this.clientservice.fileUpdate(this.fileToUpload,id,changedstatus)
    .subscribe(data => {if(data === "true")
        {this.toastr.success("File Uploaded");
      console.log(data)}
      else{
        this.toastr.error("File Already Exist")
      }});
  }
}
