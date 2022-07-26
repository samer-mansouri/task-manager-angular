import { Component, Input, OnInit } from '@angular/core';
import { faUserPlus, faXmark, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { StoreService } from '../../services/store.service';
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
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]),
    fonction: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9 ]*')]),
    role: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]),
  });

  

  

  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(private dataService: DataService, 
    private storeService: StoreService,
    private store: Store<{users: User[]}>
    ) { }

  onSubmit() : void {
    //console.log(this.addUserForm.value);
    this.isLoading = true;
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
          this.toggleModal();
          this.isLoading = false;
        }
      )
    } else {
      this.dataService.createUser(this.addUserForm.value).subscribe(
        data => {
          console.log(data);
          //this.storeService.addUser(data);
          this.store.dispatch(appendUser({user: data}));
          this.toggleModal();
          this.isLoading = false;
        })
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

}
