import { Component, OnInit } from '@angular/core';
import {ConseillerServiceService} from "../../Services/conseiller-service.service";
import {RDVServiceService} from "../../Services/rdvservice.service";
import {RDV} from "../../Modals/rdv";
import {RDVdate} from "../../Modals/rdvdate";
import {Modal} from "bootstrap";
import {User} from "../../Modals/user";

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.scss']
})
export class RdvComponent implements OnInit {
  R:RDV
  RDVS:RDVdate[]
  date:any="Choisir une date";
  heures:String[]
  hour:any
  lat:any;
  long:any;
  Conseiller:User
  constructor(private service:ConseillerServiceService,private RDVService:RDVServiceService) { }

  ngOnInit(): void {



  }
  AddRDV(){
    this.R=new RDV()
    this.R.daterdv=this.date;
    this.R.heure=this.hour
    this.RDVService.addRDV(this.R,this.Conseiller.idEmployee,2).subscribe(rdv=>{

    })
  }

  getConseillerFreeTime(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        if(position){
          this.lat=position.coords.latitude;
          this.long=position.coords.longitude;
          this.service.getConseillerPlusProche(this.lat,this.long).subscribe(c=>{
            this.Conseiller=c;
          })
          this.service.getConseillerRDV(this.lat,this.long).subscribe(data=>{
            this.RDVS=data;
            console.log(data)
          })

        }
      })
    }


  }

  getConseillerFreeTimeW(){
  this.service.getConseillerPlusProcheWAddr("").subscribe(c=>{
    this.Conseiller=c
  })
    this.service.getConseillerRDVWAddr("").subscribe(data=>{
      this.RDVS=data;
      console.log(data)
    })
  }



  open(){
  if (this.date==this.RDVS[0].date){
    this.heures=this.RDVS[0].heure
  }
    else if (this.date==this.RDVS[1].date){
      this.heures=this.RDVS[1].heure
    }
  }

  getCurrentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        if(position){
          this.lat=position.coords.latitude;
          this.long=position.coords.longitude;

        }
      })
    }
  }

  ConfirmRDV(){
    this.AddRDV();

  }


}
