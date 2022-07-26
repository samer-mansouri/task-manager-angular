import { Component, Input, OnInit } from '@angular/core';
import { faXmark, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { removeUser } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {

  showModal = false;
  faXmark = faXmark;
  faUserMinus = faUserMinus;
  isLoading = false;

  @Input('user') user: any;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(private dataService: DataService, private store: Store<{users: any}>) { 

  }

  deleteUser() {
    this.isLoading = true;
    this.dataService.deleteUser(this.user.id).subscribe(
      data => {
        console.log(data);
        this.store.dispatch(removeUser({id: this.user.id}));
        this.toggleModal();
        this.isLoading = false;
      }
    )
  }

  ngOnInit(): void {
    console.log(this.user);
  }

}
