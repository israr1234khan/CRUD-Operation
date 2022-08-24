import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmplistService } from '../emplist.service';
import { EmpDashModel } from '../employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public formValue !:FormGroup;
showadd!:boolean;
showupdate!:boolean;
empModelobj:EmpDashModel=new EmpDashModel();
EmpAll:any;
  constructor(private formbuilder:FormBuilder , private emp:EmplistService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      gender:[''],
      mobile:[''],
      dob:[''],
      address:[''],
      salary:[''],
      position:[''],
    })
    this.getAllEmps()
  }
  clickAddEmp(){
   this.formValue.reset();
   this.showadd=true;
   this.showupdate=false; 
  }
postEmpDetails(){
  this.empModelobj.name=this.formValue.value.name;
  this.empModelobj.gender=this.formValue.value.gender;
  this.empModelobj.mobile=this.formValue.value.mobile;
  this.empModelobj.dob=this.formValue.value.dob;
  this.empModelobj.address=this.formValue.value.address;
  this.empModelobj.salary=this.formValue.value.salary;
  this.empModelobj.position=this.formValue.value.position;

this.emp.postEmp(this.empModelobj).subscribe(res=>{
  console.log(res);
  alert("Added Successfull");
  this.formValue.reset();
  this.getAllEmps();
},eer=>{
alert("Something went wrong !!")
})
}
getAllEmps(){
  
this.emp.getEmp().subscribe(res=>{
  this.EmpAll=res;
})
}
deleteEmps(data:any){
  this.emp.deleteEmp(data.id).subscribe(res=>{
    alert("Deleted Successfully");
    this.getAllEmps();
  })
}
onedit(data:any){
  this.showadd=false;
  this.showupdate=true; 
  this.empModelobj.id= data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['gender'].setValue(data.gender);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['dob'].setValue(data.dob);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['salary'].setValue(data.salary);
  this.formValue.controls['position'].setValue(data.position);
}
updateEmpDetails(){
  
  this.empModelobj.name=this.formValue.value.name;
  this.empModelobj.gender=this.formValue.value.gender;
  this.empModelobj.mobile=this.formValue.value.mobile;
  this.empModelobj.dob=this.formValue.value.dob;
  this.empModelobj.address=this.formValue.value.address;
  this.empModelobj.salary=this.formValue.value.salary;
  this.empModelobj.position=this.formValue.value.position;
  
this.emp.updateEmp(this.empModelobj,this.empModelobj.id).subscribe(res=>{
  alert("Úpdated Successfull");
  this.formValue.reset();
  this.getAllEmps();
})
}
}
