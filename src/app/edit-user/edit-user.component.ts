import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder  } from '@angular/forms';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  getId:any;
  updateForm:FormGroup;

  constructor(
    public  formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,
    private crudService:CrudService,
    ) { 
      this.getId =this.activatedRoute.snapshot.paramMap.get('id');
      this.crudService.GetUser(this.getId).subscribe(res=>{
        this.updateForm.setValue({
          name:res['name'],
          email:res['email'],
          address:res['address']
        });
      });
      this.updateForm=this.formBuilder.group({
        name:[''],
        email:[''],
        address:['']
      })
    }

  ngOnInit(): void {
  }
  onUpdate():any{
    this.crudService.updateUser(this.getId,this.updateForm.value)
    .subscribe(()=>{
      console.log('Data Updated successfully')
      this.ngZone.run(()=>this.router.navigateByUrl('/users-list'))
    },(err)=>{
      console.log(err)
    })
  }

}
