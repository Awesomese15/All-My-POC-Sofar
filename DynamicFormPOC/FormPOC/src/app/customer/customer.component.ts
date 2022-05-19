import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { Friends } from '../friends.model';
import { username } from '../shared/custom-validator';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
   dateVariable="2023-10-09";
  countryList: any=[];
  countryDropdownSettings: any=[];
  stateList:any=[];
  stateDropdownSettings: any=[];
  cityList:any=[];
  cityDropdownSettings: any=[]
  dropdownList :any=[];
  selectedItems :any=[];
  dropdownSettings : IDropdownSettings;
  roleDropdownSettings: any=[];
  roleList: any[];
  submitted: boolean;
  friends: FormArray;
  controlForDynamicFields: FormArray;

  constructor(private fb: FormBuilder, private http: HttpClient) { }


  

  
  restrictedUN: string = "user";
  customerForm=this.fb.group({
    name: new FormControl('', [Validators.required, username(this.restrictedUN) ]),
    address: this.fb.group({
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    }),
    roles: new FormControl('', Validators.required),
    friends: this.fb.array([])
  });


  createFriends(): FormGroup{
    return this.fb.group({
      name: new FormControl('', Validators.required),
      address: this.fb.group({
        country: new FormControl('' , Validators.required),
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required)
      }),
      roles: new FormControl('', Validators.required),
    })
  }

  // createFriends(): FormGroup{
  //   return this.fb.group({
  //     name: new FormControl('', Validators.required),
  //     dob: new FormControl(''),
  //     mobile : new FormControl(''),
  //     email: new FormControl(''),
  //     roles: new FormControl('')
  //   })
  // }

  // thenBlock: TemplateRef<any>|null = null;
  // @ViewChild('errorBlock') errorBlock:TemplateRef<any>|null=null;
 
  addFriends(){    
    this.controlForDynamicFields=<FormArray>this.customerForm.controls['friends'];
    console.log(this.controlForDynamicFields['controls'].length);
   // var arrayControl : []=this.customerForm.controls['friends']['controls'];
   
      if(this.controlForDynamicFields['controls'].length>0 && this.controlForDynamicFields['controls'][this.controlForDynamicFields['controls'].length-1].get('name')['value']==""){
        window.alert(`Enter the name`);
      }
  
      else{
            //this.thenBlock=this.errorBlock;
   // this.controlForDynamicFields=<FormArray>this.customerForm.controls['friends'];
    this.friends=this.customerForm.get('friends') as FormArray;
    this.friends.push(this.createFriends());
    //this.controlForDynamicFields=this.friends;
    //console.log(controlForDynamicFields['controls'][0].get('name'));
    //console.log(this.controlForDynamicFields['controls']);
      }

    
  }

  removeFriend(){
    if(this.friends.length>0){
      this.friends.removeAt(this.friends.length-1);
    }else{
      return
    }
  }

  removeSelectedFriend(index : number){
    this.friends.removeAt(index);
  }


  //dropdown

  ngOnInit(): void {
    this.getData();
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' },
    //   { item_id: 6, item_text: 'New York' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];

    this.roleList=[
      { item_id: 1, item_text: 'Admin' },
      { item_id: 2, item_text: 'Admin2' },
      { item_id: 3, item_text: 'Admin3' },
      { item_id: 4, item_text: 'Admin4' },
    ];
    this.countryDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.stateDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.cityDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.roleDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
//On counrty select
stateData: any;
  onItemSelect(item: any) {
    let temp=[];
    console.log(item);
    if(this.data !=null)
    for(let i=0; i < this.data.length; i++){
      if(item.item_text == this.data[i].name){
        this.stateData=this.data[i];
        for(let j=0; j<this.data[i].states.length; j++){
          temp.push({item_id: j, item_text: this.data[i].states[j].name});
        }
        break;
      }
    }
    this.stateList=temp;
    console.log(this.stateList);
  }

  //on state select


  onStateSelect(item: any) {
    let temp=[];
    console.log(item);
    console.log(this.stateData);
    if(this.stateData!=null)
    for(let i=0; i < this.stateData.states.length; i++){
      if(item.item_text == this.stateData.states[i].name){
        for(let j=0; j<this.stateData.states[i].cities.length; j++){
          temp.push({item_id: j, item_text: this.stateData.states[i].cities[j].name});
        }
        break;
      }
    }
    this.cityList=temp;
    console.log(this.cityList);
  }

  onCitySelect(item : any){
    console.log(item);
    
  }






  onSelectAll(items: any) {
    console.log(items);
  }

  data=[];
  getData(): void {
    let tmp = [];
    this.http.get<any>('http://localhost:9020/address/getCountries').subscribe(data => {
    this.data=data;  
    console.log(data);
      for(let i=0; i < data.length; i++) {
        tmp.push({ item_id: i, item_text: data[i].name });
        
      }
      this.countryList = tmp;
    });
  }

  objectToSubmit : any;
  friendsObj: Friends;
  onSubmit(){
    //this.getCountries();
    this.submitted=true;
    if(!this.customerForm.valid){
      window.alert("Fill the required fields");
      return;
    }
    console.log(JSON.stringify(this.customerForm.value));
    this.friendsObj=this.customerForm.value.friends;
     console.log(this.friendsObj);
    this.objectToSubmit={ 
      name: this.customerForm.value.name,
      address:{
        country: this.customerForm.value.address.country[0] ? this.customerForm.value.address.country[0]['item_text'] : "",
        state : this.customerForm.value.address.state[0] ? this.customerForm.value.address.state[0]['item_text'] : "",
        city: this.customerForm.value.address.city[0] ? this.customerForm.value.address.city[0]['item_text'] : ""
      },
      roles: this.getRoles(null),
      friends: this.getFriends()
    }

    console.log(this.objectToSubmit);
    
  }
  
  getFriends(){
  let friendsLst =[];  
    
      for(let i=0; i<this.customerForm.value.friends.length; i++){
        let friendObj={
          name: this.customerForm.value.friends[i].name,
          address: {
            country:  this.customerForm.value.friends[i].address.country[0]['item_text'],
            state:  this.customerForm.value.friends[i].address.state[0]['item_text'],
            city:  this.customerForm.value.friends[i].address.city[0]['item_text']
          },
          roles: this.getRoles(i)
        }
        console.log(friendObj);
        
       friendsLst.push(friendObj)
      }
   
      
      return friendsLst;
  }

    getRoles(index : number) {
    let rolesArray = [];
    if(index==null){
      for(let i=0; i<this.customerForm.value.roles.length; i++){
        rolesArray.push(this.customerForm.value.roles[i]['item_text']) 
      }
    }else{
      for(let j=0; j<this.customerForm.value.friends[index].roles.length; j++){
        rolesArray.push(this.customerForm.value.friends[index].roles[j]['item_text']) 
      }
    }

    //console.log(countryArray);
    
    return rolesArray;
  }


  // getCountries() {
  //   let countryArray = [];
  //   for(let i=0; i<this.customerForm.value.address.country.length; i++){
  //     countryArray.push(this.customerForm.value.address.country[i]['item_text']) 
  //   }
  //   //console.log(countryArray);
    
  //   return countryArray;
  // }

  // getStates() {
  //   let stateArray = [];
    
  //   for(let i=0; i<this.customerForm.value.address.state.length; i++){
  //     stateArray.push(this.customerForm.value.address.state[i]['item_text']) 
  //   }
  //   console.log(stateArray);
    
  //   return stateArray;
  // }

  // getCities() {
  //   let cityArray = [];
  //   this.customerForm.value.address.country
  //   for(let i=0; i<this.customerForm.value.address.city.length; i++){
  //     cityArray.push(this.customerForm.value.address.city[i]['item_text']) 
  //   }
  //  console.log(cityArray);
    
  //   return cityArray;
  // }
  
  onRoleSelect(item :any){
      console.log(item);
      
  }

  get customerFormControls(){
    //console.log(this.customerForm.controls);
   // console.log(this.customerForm.get('address').get('country'));
    return this.customerForm.controls;
  }

  // get customerAddressControls(){
  //   console.log(this.customerForm.controls.address);
    
  //   return this.customerForm.controls.address;
  // }
  get country(){ 
    return this.customerForm.get('address').get('country')
  }

  get state(){ 
    return this.customerForm.get('address').get('state')
  }

  get city(){ 
    return this.customerForm.get('address').get('city')
  }
  get friendName(){
    console.log(this.customerForm.get('friends'));
    
    return this.customerForm.get('friends');
  }

}
