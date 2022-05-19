import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http : HttpClient) { }

  // getCars(params : any): Observable<any>{
  //   console.log("In the service ="+JSON.stringify(params) );
    
  //   return this.http.get<any>("http://localhost:9010/cars/getcars", {params});
  // }

  getCars(params: any): Observable<any>{
    console.log("GetSortedCar");
    

    return this.http.get<any>("http://localhost:9010/cars/get", {params});
  }
  // getAllCars(): Observable<any>{
  //   return this.http.get<any>("http://localhost:9010/cars//allcars/all");
  // }
}
