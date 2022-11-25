import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Contrat} from "../Modals/Contrat";

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  url : string = 'http://localhost:5000/prime';
  constructor(private http: HttpClient) { }



  getprime(table_tv:string, table_td:string, produit:number, age:number, i:number, amount:number, n:number, m:number, k=0){
    return this.http.get(`${this.url}/${table_tv}/${table_td}/${produit}/${age}/${i}/${amount}/${n}/${m}/${k}`)
  }

}
