import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CustomCellColorComponent } from './custom-cell-color/custom-cell-color.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

export class AppComponent implements OnInit{
  

  @ViewChild('agGrid') agGrid: AgGridAngular;

  gridApi: any;
  columnApi: any;
  rowClassRules: any;
  isNewRow: boolean;

  gridOptions:any;

  paginationPageSize: any;
  title = 'NetLinkAgGridPOC';

  columnDefs = [
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

// rowData = [
//     { make: 'Toyota', model: 'Celica', price: 35000 },
//     { make: 'Ford', model: 'Mondeo', price: 32000 },
//     { make: 'Porsche', model: 'Boxter', price: 72000 }
// ] 

constructor(private http: HttpClient){
    this.gridOptions={
      context : {
          componentParent : this
      }
    };

    this.rowClassRules={
      'rag-green' : 'data.price<35000',
      'rag-red': 'data.price>=7200'
    }

    this.paginationPageSize=10;
}

rowData: any;

ngOnInit(): void {
  this.rowData = this.http.get('https://www.ag-grid.com/example-assets/small-row-data.json');
}



getSelectedRows() {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map(node => node.data );
  const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');

  alert(`Selected nodes: ${selectedDataStringPresentation}`);
}

onGridReady(params : any){
    this.gridApi=params.api;
    this.columnApi=params.columnApi;

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


