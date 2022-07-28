import { Component, Input, OnInit } from '@angular/core';
import { faUserPlus, faXmark, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { appendUser, updateUser } from 'src/app/store/users/users.actions';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {

  showModal = false;
  faUserPlus = faUserPlus;
  faXmark = faXmark;
  faUserPen = faUserPen;
  isLoading = false;
  isSuccess = false;
  isError : boolean = false;


  @Input('user') user: any;
  @Input('type') type: string | undefined; 
  roles = [
    {
      name: 'Administrateur',
      value: 'ADMIN'
    },
    {
      name: 'Chef de projet',
      value: 'PROJECT_CHIEF'
    },
    {
      name: 'Membre de projet',
      value: 'PROJECT_MEMBER'
    }
  ]

  addUserForm : FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]),
    address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    fonction: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    password: new FormControl('12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(55)]),
    role: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  });

  

  

  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(private dataService: DataService, 
    private store: Store<{users: User[]}>
    ) { }

  onSubmit() : void {
    //console.log(this.addUserForm.value);
    this.isLoading = true;

    //if form type is edit
    if(this.type === 'edit') {
      let dataToSend = {
        id: this.user.id,
        firstName: this.addUserForm.value.firstName,
        lastName: this.addUserForm.value.lastName,
        email: this.addUserForm.value.email,
        phone: this.addUserForm.value.phone,
        address: this.addUserForm.value.address,
        fonction: this.addUserForm.value.fonction,
        role: this.addUserForm.value.role
      }
      this.dataService.updateUser(dataToSend).subscribe(
        data => {
          console.log(data);
          this.store.dispatch(updateUser({user: data.user}));
          this.isLoading = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.toggleModal();
          }, 3000);
        }
      )
    } else {

      //if form type is add
      this.dataService.createUser(this.addUserForm.value).subscribe(
        data => {
          console.log(data);
          //this.storeService.addUser(data);
          this.store.dispatch(appendUser({user: data}));
          this.isLoading = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.toggleModal();
          }, 3000);
        },
        
        error => {
          if (error.status === 400) {
            this.isLoading = false;
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 3000);
          }

          // this.isLoading = false;
          // this.isSuccess = false;
        }
        
        
        
        
        
        )

        
    }
    
  }

  logUser() : void {
    console.log(this.addUserForm.value);
  }

  ngOnInit(): void {
    if(this.type === 'edit') {
      this.addUserForm.patchValue(this.user);
    }
  }

  logForm() : void {
    console.log(this.addUserForm.value);
  }

}
