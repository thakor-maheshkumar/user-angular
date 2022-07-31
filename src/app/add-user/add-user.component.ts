import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm:FormGroup;
  constructor( 
    public formBuilder: FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService:CrudService
    ) { 
      this.userForm=this.formBuilder.group({
        name:[''],
        email:[''],
        address:[''],
      })
    }

  ngOnInit(): void {
  }
  onSubmit():any{
    this.crudService.AddUser(this.userForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=>this.router.navigateByUrl('/users-list'))
    },(err)=>{
      console.log(err)
    })
  }

}
