import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RDVdate} from "../Modals/rdvdate";

@Injectable({
  providedIn: 'root'
})
export class CEServiceService {

  url : string = 'http://127.0.0.1:8082/Banque/compteepargne/';
  constructor(private http: HttpClient) { }

  Simulate(init,mens,p,type,typeV):Observable<number>{
    return this.http.get<number>(this.url+"simulate",{params:{init:init,mens:mens,p:p,type:type,typeV:typeV}});
  }

  SimulatePM(init,mens,p,type,typeV):Observable<number>{
    return this.http.get<number>(this.url+"simulatePM",{params:{init:init,mens:mens,p:p,type:type,typeV:typeV}});
  }

  ContributionTotal(vers,type,typeP,p):Observable<number>{
    return this.http.get<number>(this.url+"ContributionTotale",{params:{vers:vers,type:type,p:p,typeP:typeP}});
  }
}
