import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../model/User';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../../services/store.service';
import { Store } from '@ngrx/store';
import { setUsers } from 'src/app/store/users/users.actions'
import { Observable } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : any;
  search: string = '';
   
  users$: Observable<User[]>;

  faUserPlus = faUserPlus;

  isLoading: boolean = false;

  columns = [
    // { 
    //   prop: 'Identifiant',
    //   accessor: 'id'
    // },
    {
      prop: 'Nom',
      accessor: 'firstName'
    },
    {
      prop: 'Prénom',
      accessor: 'lastName'
    },
    {
      prop: 'Email',
      accessor: 'email'
    },
    {
      prop: 'Téléphone',
      accessor: 'phone'
    },
    {
      prop: 'Adresse',
      accessor: 'address'
    },
    {
      prop: 'Fonction',
      accessor: 'fonction'
    },
    {
      prop: 'Rôle',
      accessor: 'role'
    },
    {
      prop: 'Modifier',
      accessor: 'update'
    },
    {
      prop: 'Supprimer',
      accessor: 'delete'
    }
  ];
  
  

  p : number = 1;


  //pagination




  constructor(public dataService: DataService,
     private storeService: StoreService,
      private store: Store<{users: User[]}>,
      private actionListener$: ActionsSubject
      ) {
    this.users$ = this.store.select('users');
  }
  

  fetchData() {
    this.isLoading = true;
    this.dataService.getUsersList()
    .subscribe(
      (data) => {
        console.log(data);
        //this.storeService.setUsersList(data);
        this.users = data;
        this.store.dispatch(setUsers({users: data}));
        this.isLoading = false;

      });

  }

  updateUser(id: number) {
    console.log(id);
  }
  

 

  searchUser() {
    
    let usrs: User[] = [];

    this.users$.subscribe(users => {
      usrs = this.users = users.filter(user => {
        return user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.search.toLowerCase()) ||
        user.address.toLowerCase().includes(this.search.toLowerCase()) ||
        user.fonction.toLowerCase().includes(this.search.toLowerCase()) ||
        user.role.toLowerCase().includes(this.search.toLowerCase());
      });

    });

    console.log(usrs);
    

    
    
    console.log(this.search);
    this.users = usrs;
    
    
  }

  ngOnInit(): void {
    console.log(this.users$.subscribe(users => users.length === 0) )
    let usrs: string | any[] = [];
    console.log(this.users$.subscribe(users => usrs = users));
    if (usrs.length === 0) {
      this.fetchData();
    } else {
      //this.divideIntoPages(this.users);
      this.users = usrs;
    }

    this.actionListener$.pipe(skip(1)).subscribe(action => {
      if (action.type !== 'SET_USERS') {
        this.store.select('users').subscribe(users => this.users = users);
      }
    })

 
  }

}
