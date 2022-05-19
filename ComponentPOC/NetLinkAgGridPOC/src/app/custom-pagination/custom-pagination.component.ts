import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';

import { Subscription } from 'rxjs';
import { CustomCellColorComponent } from '../custom-cell-color/custom-cell-color.component';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css']
})
export class CustomPaginationComponent implements OnInit {

  
  @ViewChild('agGrid') agGrid: AgGridAngular;



  gridApi: any;
  columnApi: any;
  rowClassRules: any;
  isNewRow: boolean;
  cacheOverflowSize : any;
  maxConcurrentDatasourceRequests: any;
  infiniteInitialRowCount: any;
  pagination: any;

  gridOptions:any;


  paginationPageSize: any;
  title = 'NetLinkAgGridPOC';
  columnDefs : any;

  

// rowData = [
//     { make: 'Toyota', model: 'Celica', price: 35000 },
//     { make: 'Ford', model: 'Mondeo', price: 32000 },
//     { make: 'Porsche', model: 'Boxter', price: 72000 }
// ] 

constructor(private http: HttpClient){
  
  this.columnDefs = [
    { field: 'make', 
      sortable: true, 
      filter: true, 
      checkboxSelection: true,
      editable: true
    },
    
    { field: 'model', 
      sortable: true, 
      filter: true,
      //cellStyle : {color: 'red', 'background-color' : 'green'}
      editable: true
    },
    
      { field: 'price',
       sortable: true, 
       filter: true , 
       editable: true
      },
    
      {  field: '', 
      cellRendererFramework : CustomCellColorComponent},
];

    this.gridOptions={
      context : {
          componentParent : this
      }
    };

    // this.rowClassRules={
    //   'rag-green' : 'data.price<35000',
    //   'rag-red': 'data.price>=7200'
    // };
    // this.cacheOverflowSize=2;
    // this.maxConcurrentDatasourceRequests=2;
    // this.infiniteInitialRowCount=2;

   
//    this.gridOptions={
//      headerHeight: 45,
//      rowHeight: 30,
//      cacheBlockSize: 10,
//      paginationPageSize: 10,
//      rowModelType: 'infinite' 
//    }

this.paginationPageSize=10;
 }

rowData : any;
ngOnInit(): void {
  //this.rowData = this.http.get('https://www.ag-grid.com/example-assets/small-row-data.json');
}



getSelectedRows() {
  
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map(node => node.data );
  const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');

  alert(`Selected nodes: ${selectedDataStringPresentation}`);
}

onGridReady(params : any){
   
  console.log("Hello");
    this.gridApi=params.api;

    console.log("Grid Api"+ this.gridApi);
    this.columnApi=params.columnApi;
    // var dataSource={
    //   getRows: (params : IGetRowsParams)=>{
    //     this.http.get<any>("http://localhost:9010/cars/allcars/all").subscribe(data=>{

    //     console.log(data);
    //     params.successCallback(data['make'], data['totalRecords'])
    //     });
    //   }
    // }
if(this.isPageChanged){
  this.http.get("http://localhost:9010/cars/allcars/"+this.currentPage).subscribe(data=>{
    console.log(data);
    this.rowData=data;
  })
}else{
  this.http.get("http://localhost:9010/cars/allcars/"+1).subscribe(data=>{
    console.log(data);
    this.rowData=data;
  })
}
  


}

currentPage : any
isPageChanged: boolean
onPaginationChanged(event : any){
 // console.log("ob");
  
  if(this.gridApi){
    console.log("I am here");
    
    this.isPageChanged=true;
    this.currentPage=this.gridApi.paginationGetCurrentPage() + 1;
  }
   

}

updateRow(){
  var rowNode= this.gridApi.getRowNode(1);
  rowNode.setData(
    {
       "make": "Porsche", 
        "model": "Boxter", 
        "price": 72000 
    }
  );
}


upadateCell(){
  var rowNode= this.gridApi.getRowNode(1);
  rowNode.setDataValue("model", "Mustang");
}

updateAllRow(){
  this.http.get("../assets/data.json").subscribe(data=>
    {
        this.gridApi.setRowData([]);
        var newData=data;

        this.gridApi.applyTransaction({add : newData});
    })
}

clear(){
  this.gridApi.setRowData([]);
}


//add an empty row

addItems() {
  //console.log("Add Items");
  
  var newRows = [this.createNewRowData()];
  var res = this.gridApi.applyTransaction({
    add: newRows,
    //addIndex: addIndex,
  });
 // printResult(res);
}

createNewRowData() {
  var price : number;
  var newData = {
    make: '',
    model: '',
    price: 0
  };
  
  return newData;
}


removeItems(){
  var selectedData = this.gridApi.getSelectedRows();
  var res = this.gridApi.applyTransaction({ remove: selectedData });
}


}
