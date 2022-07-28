import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ConfirmPasswordValidator } from 'src/validators/confirm-password.validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  currentUser: any;
  isLoading: boolean = false;
  isSuccess: boolean = false;
  successPasswordUpdate: boolean = false;
  errorPasswordUpdate: boolean = false;

  update: string = "infos";
  

  firstNameInput = '';

  updateUserForm = new FormGroup({
    firstName: new FormControl(this.firstNameInput, 
      [Validators.required,
         Validators.minLength(2),
          Validators.maxLength(20),
           Validators.pattern('[a-zA-Z ]*')
          ]
        ),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), 
      
      ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]),
    address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    fonction: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    
  });

  updateUserPasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    //compare newPassword with confirmPassword
    confirmNewPassword: new FormControl('', 
      [
        Validators.required,
      ]),
    
  },
  {
    validators: ConfirmPasswordValidator.passwordValidator 
  }
  
  
  );

  constructor(private dataService: DataService,
    private confirmPasswordValidator: ConfirmPasswordValidator
    ) { }

  fetchData() : void {
    this.dataService.getUser()
    .subscribe(data => {
      console.log(data);
      this.currentUser = data;
      this.updateUserForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        address: this.currentUser.address,
        fonction: this.currentUser.fonction,
      });
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  onSubmit() : void {
    // console.log(this.updateUserForm);
    // console.log(this.updateUserForm.updateValueAndValidity());
    // if(this.updateUserForm.status === 'VALID') {
    //   console.log(this.updateUserForm.value);
    // } else {
    //   console.log('Form is invalid');
    // }
    console.log(this.updateUserForm.value);
    this.isLoading = true;
    let dataToSend = {
      id: this.currentUser.id,
      firstName: this.updateUserForm.value.firstName,
      lastName: this.updateUserForm.value.lastName,
      email: this.updateUserForm.value.email,
      phone: this.updateUserForm.value.phone,
      address: this.updateUserForm.value.address,
      fonction: this.updateUserForm.value.fonction,
    }
    this.dataService.updateUser(dataToSend)
    .subscribe(data => {
      console.log(data.user);
      this.updateUserForm.patchValue({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        phone: data.user.phone,
        address: data.user.address,
        fonction: data.user.fonction,
      });
      this.isLoading = false;
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      } , 3000);
    });

  }

  toggleUpdate(str : string) : void {
    this.update = str;
  }

  updatePassword() : void {
    console.log(this.updateUserPasswordForm.value);
    let dataToSend = {
      userId: this.currentUser.id,
      oldPassword: this.updateUserPasswordForm.value.oldPassword,
      newPassword: this.updateUserPasswordForm.value.newPassword,
    }
    this.dataService.updateUserPassword(dataToSend)
    .subscribe(data => {
      console.log(data);
      
      this.successPasswordUpdate = true;
      setTimeout(() => {
        this.successPasswordUpdate = false;
      }, 3000);
    } 
    , error => {
      console.log(error);
      if (error.error.message === 'Wrong password') {
        this.errorPasswordUpdate = true;
        setTimeout(() => {
          this.errorPasswordUpdate = false;
        } , 3000);
      }
    }
    );
  }

 

  //regex with letters and white spaces
  // pattern = '[a-zA-Z ]*';

}
