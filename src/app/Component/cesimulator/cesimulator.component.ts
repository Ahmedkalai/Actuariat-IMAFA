import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CEServiceService} from "../../Services/ceservice.service";
import {Options} from "@angular-slider/ngx-slider";
import {CanvasJS} from "../../../assets/canvasjs.angular.component";
import { ViewChild } from '@angular/core'
import {WebSocketServiceService} from "../../Services/web-socket-service.service";
import {ContratService} from "../../Services/contrat.service";
import {Contrat} from "../../Modals/Contrat";
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'app-cesimulator',
  templateUrl: './cesimulator.component.html',
  styleUrls: ['./cesimulator.component.scss']
})
export class CESimulatorComponent implements OnInit,OnChanges {
  u:Object
  p:Object
  contrat=new Contrat();
  test: string ;
  testamount: any;
  testage: any;
  testn: any;
  testi: any;

  constructor(private service:ContratService) {

  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges):void{

  }

  simulate(){
    this.u=null;
    this.p=null;
    this.test=null;
    this.testage=null;
    this.testamount=null;
    if (this.contrat.k==undefined)
      this.contrat.k=0

    if((this.contrat.m>this.contrat.n) || (this.contrat.age>104) || (this.contrat.amount<=0) )
    {   if((this.contrat.m>this.contrat.n))
                 {this.test='verifiez le nombre de payements'}
      if((this.contrat.age>104))
                 {this.testage="Age maximum 104"}
      if((this.contrat.amount<=0))
                  {this.testamount="Montant doit etre positif"}


    }
    else
    {
      this.service.getprime("TV88-90","TD88-90", this.contrat.type, this.contrat.age, this.contrat.i, this.contrat.amount,
        this.contrat.n, this.contrat.m, this.contrat.k).subscribe(res=>{console .log(res); this.u=res[0]+"€";this.p=res[1]+"€"
      });

    }

  }


  clean() {
    this.contrat.n=null;
    this.contrat.m=null;
    this.contrat.amount=null;
    this.contrat.k=null;
    this.contrat.age=null;
    this.contrat.i=null;
    this.u=null;
    this.p=null;
    this.test=null;
    this.testage=null;
    this.testamount=null;


  }
}
