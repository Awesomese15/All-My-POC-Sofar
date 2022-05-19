import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class MyAutoCompleteComponent implements OnInit {

  constructor(private service : CarService ) { }



  ngOnInit(): void {
  }

  keyword = 'make';
 
    selectEvent(item : any) {
    // do something with selected item
  }

  cars: any[] =[];
  isCollectedData: boolean=false;
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    if(!this.isCollectedData){
      // this.service.getAllCars().subscribe(data=>{
      
      //   //this.countries.push(...data);
       
      //   this.cars.push(...data);
      //   console.log("cars "+this.cars);
        
        
      // });
    }
    this.isCollectedData=true;

  }

  onFocused(e : any) {
    // do something
  }

}
