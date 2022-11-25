import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RDVServiceService} from "../Services/rdvservice.service";
import {CalendarEvent, CalendarEventAction} from "angular-calendar";
import {HttpClient} from "@angular/common/http";
import {startOfDay} from "date-fns";
import {EventColor} from "calendar-utils";
import {RDV} from "../Modals/rdv";


@Injectable()
export class SinglePostResolver implements Resolve<any>{

  constructor(

    private service:RDVServiceService,private http:HttpClient){



  }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log("hhh")
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<RDV[]>   {

    return this.http.get<RDV[]>("http://127.0.0.1:8082/Banque/rdv/ClientRdv",{params:{idc:2}});
  }

}
