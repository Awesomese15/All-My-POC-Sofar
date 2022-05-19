import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-cell-color',
  templateUrl: './custom-cell-color.component.html',
  styleUrls: ['./custom-cell-color.component.css']
})
export class CustomCellColorComponent implements OnInit {

  constructor() { }
  params: any;
  data : any
  agInit( params : any){
    this.params=params;
      this.data=params.value;
  }

  ngOnInit(): void {
  }

  execute(){
    console.log(this.params);
    console.log(this.params.data);
    //this.params.context .componentParent.updateAllRow();
    
  }

  execute1(){
        this.params.context .componentParent.updateAllRow();

  }

}
