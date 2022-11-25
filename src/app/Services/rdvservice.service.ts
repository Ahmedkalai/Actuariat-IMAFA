import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RDVdate} from "../Modals/rdvdate";
import {RDV} from "../Modals/rdv";

@Injectable({
  providedIn: 'root'
})
export class RDVServiceService {
  url : string = 'http://127.0.0.1:8082/Banque/rdv/';

  constructor(private  http: HttpClient) { }

  addRDV(R:RDV,id,idc):Observable<RDV>{
    return this.http.post<RDV>(this.url+"addRDV",R,{params:{id:id,idc:idc}});
  }

  getClientRDV(idc):Observable<RDV[]>{
    return this.http.get<RDV[]>(this.url+"ClientRdv",{params:{idc:idc}});
  }
}
