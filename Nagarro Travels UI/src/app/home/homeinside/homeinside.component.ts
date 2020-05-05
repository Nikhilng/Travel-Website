import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/ClientLogin/ClientLogin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { FileSaverService } from 'ngx-filesaver';
 
@Component({
  selector: 'app-homeinside',
  templateUrl: './homeinside.component.html',
  styleUrls: ['./homeinside.component.css']
})
export class HomeinsideComponent implements OnInit {
  tickets: Array<any>;
  totalRecordes:number;
  page:number = 1;
  data:any;
 
  destination:any;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Cases' }
  ];
  ngOnInit(): void {
    this.authenticate();
    this.viewticket();
  }
 
  constructor(private clientservice:ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toatr: ToastrService,
    private filesave: FileSaverService){      
    
  }
 
  authenticate(){
    this.clientservice.authenticate()
    .subscribe(data => {if(!data){
      this.goto();
    }},error => console.log(error,"yeh"))
  }

    

    download(id){
    this.clientservice.downloadFile(id).subscribe(response=>
      {
    this.filesave.save(response, 'ticket.pdf');
    this.toatr.success("File Downloaded");
      }, error=>this.toatr.error("Ticket not exist"))
    }


 
  viewticket(){
    this.clientservice.viewticket()
    .subscribe(data => this.tickets=JSON.parse(data),error => console.log(error));
  }
 
  populatedata(data:any){
    this.data = data;
  }
 
  edit(data:any){
    if(data.status == "Submitted" || data.status == "Done")
    {
      this.toatr.error("Cannot Edit","Error");
    }else{
      this.data.status="Resubmitted";
      this.router.navigate(['/home/ticket'],{
        queryParams:{data:btoa(JSON.stringify(this.data))}
      })
    }
  }
 
  logout(){
    this.clientservice.logout();
    this.goto();
  }
 
  goto(){
    this.router.navigate(['/']);
  }
 
  graph(){
    this.barChartLabels = [];
    this.barChartData[0].data=[];
    this.clientservice.coronadetails(this.destination)
    .subscribe(result => {result.forEach(element => {
      this.barChartLabels.push(element.Date.substring(0, 10));
      this.barChartData[0].data.push(element.Confirmed)
      
    })}); 
  }
 
}