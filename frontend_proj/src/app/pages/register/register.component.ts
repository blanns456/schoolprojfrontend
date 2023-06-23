import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserController } from 'src/controllers/usersContoller.component';
import Swal from 'sweetalert2';
declare var $: any;
//
// import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-register-form',
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
  users: any;
  info: any;
  userinfo: any;
  myForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]]
  });

  myUpdateForm: FormGroup = this.formBuilder.group({
    user_id:['',[Validators.required]],
    update_email: ['', [Validators.required, Validators.email]],
    update_name: ['', [Validators.required]]
  });

  // responsemessage:any;
  constructor(private formBuilder: FormBuilder, private usercontroller:UserController) { }

  ngOnInit() {
    this.loadusers();
   }


  loadusers() {
    this.usercontroller.getusers().subscribe(res => {
      this.users = res;
    })
  }


  onSubmit() {
    if (this.myForm.invalid) {
      console.log(this.myForm.invalid);
      return;
    }
    this.usercontroller.createuser(this.myForm.value).subscribe(res => {
      this.info = res;
      console.log(this.info);
      if (this.info[0]['message'] === "ERROR") {

        Swal.fire(
      'Error',
       this.info[0]['error']["email"][0],
       'error'
        )
        document.querySelector("#email")?.setAttribute("style", "border:1px solid red");
        return;
      } else {
        // this.loadusers();
        Swal.fire(
      'Success',
       'Added Successfully',
       'success'
        ).then(e => {

          window.location.reload();
        })
        return;
      }
    });

  }

  onRemove(id: number) {
     this.usercontroller.removeuser(id).subscribe(res => {
      // this.users = res;
       console.log(res);
       this.loadusers();
       Swal.fire(
      'Success',
       'DELETED',
       'success'
        )
    })
  }

  onShowInfo(id: number) {
    this.usercontroller.getUserInfo(id).subscribe(res => {
      this.userinfo = res;
      console.log(this.userinfo[0].user);
      $('#update_name').val(this.userinfo[0].user.name);
      $('#user_id').val(this.userinfo[0].user.id);
      $('#update_email').val(this.userinfo[0].user.email);
    })
  }

  onUpdate() {
    const user_update_info = {
      "name": $('#update_name').val(),
      "email": $('#update_email').val(),
      "id":$('#user_id').val()
    }

    this.usercontroller.updateUser(user_update_info).subscribe(res => {
      console.log(res);

      this.loadusers();
      Swal.fire(
      'Success',
       'Updated Successfully',
       'success'
      );

      $('#modalId').modal('hide');

    })
    console.log(user_update_info);
  }
}
