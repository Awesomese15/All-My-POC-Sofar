import { Component, OnInit, ViewChild } from '@angular/core';
import { Cars } from '../models/cars.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-server-side-pagination',
  templateUrl: './server-side-pagination.component.html',
  styleUrls: ['./server-side-pagination.component.css']
})
export class ServerSidePaginationComponent implements OnInit {

  cars: Cars[] = [];
  currentCar?: Cars;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  sorting : string="desc";
  size: string="";
  isAutoCompleteOn: boolean= false;
  search : string="";
  constructor( private service : CarService ){}

  ngOnInit() {
    this.retrieveTutorials();
   }


  getRequestParams( page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  getRequestPramaSorting(sorting: string, page: number, pageSize : number, search : string){
    let params: any = {};

    if(sorting){
      params[`sorting`]=sorting
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }
    if(search){
      params[`search`]= search;
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.page, this.pageSize);
    console.log("params"+ JSON.stringify(params));
    this.service.getCars(params)
    .subscribe(
      response => {
        const { cars, totalItems } = response;
        this.cars = cars;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    console.log("Number" + event);
    this.page = event;
    if(this.sortFlag){
      this.sortData(this.sorting);
    }else if(this.isAutoCompleteOn){
      this.onChangeSearch(this.search);
    }
    else{
      this.retrieveTutorials();
    }
    
  }

  setActiveTutorial(car: Cars, index: number): void {
    this.currentCar= car;
    this.currentIndex = index;
  }

  sortFlag : boolean=false;
  sortData(sortingMode : string) : void{
  
      console.log("In sortdata");
      this.sorting=sortingMode;
      this.sortFlag=true;
      const param=this.getRequestPramaSorting(sortingMode,this.page,this.pageSize, "");

      this.service.getCars(param).subscribe(response=>
        {
          const { cars, totalItems } = response;
          this.cars = cars;
          this.count = totalItems;
          console.log(response);
        },
        error=>{
          console.error();
          
        }
        
        );
  }

  ascOrNormal(sortingMode : string){
    console.log("Hello alterAsc");
    
   let el = document.getElementById("asc");
   console.log(el?.innerText);
   if(el?.innerText=="Ascending"){
     el.innerText="Normal";
     this.sortData(sortingMode);
   }else
   if(el?.innerText=="Normal"){
     el.innerText="Ascending"
     this.sortFlag=false;
     this.retrieveTutorials();
   }
   
   
  }

  // AutoComplete


  keyword = "make";
 
    selectEvent(item : any) {
    // do something with selected item
  }

  //cars: any[] =[];
    autoCompleCars: any[]=[];
    getParamForAutoComplete(page : number, pageSize: number, search: string ){
      let params: any = {};
      if(page){
        params[`page`]=page-1;
      }
      if(pageSize){
        params[`size`]=pageSize;
      }
      if(search){
        params[`search`]=search;
      }
      return params;
    }
    
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

    console.log("Hello Auto");
    
    if(!this.isAutoCompleteOn){
      this.page=0;
    }
    this.search=search;
    if(search!=null && search!="".trim()){
        this.isAutoCompleteOn=true;
    }else{
      this.isAutoCompleteOn=false;
    }
    this.cars=[];
    console.log("search is "+search);
    
    var sort: any;
    const param=this.getParamForAutoComplete(this.page,this.pageSize, search);
    console.log("Onchange");
      
      this.service.getCars(param).subscribe(response=>{
      
        //this.countries.push(...data);
        const { cars, totalItems } = response;
        this.cars = cars;
        this.count = totalItems;
        console.log(response);
       
        // this.cars.push(...data);
        // console.log("cars "+JSON.stringify(this.cars));
        
        
      },
      error=> {console.error()}
      );
 
    

  }

  onFocused(e : any) {
    // do something
  }

  returnBackCar : Cars
  make : any
  model : any
  price : any
  showDetails(car : any){
      console.log(car);
      this.make=car.make;
      this.model=car.model;
      this.price=car.price;
  }

}
