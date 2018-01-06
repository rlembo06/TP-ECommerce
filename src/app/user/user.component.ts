import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserService]

})
export class UserComponent implements OnInit {

    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public lastname: string;
    public firstname: string;
    public city: string;
    public street: string;
    public cp: number;

    constructor(
        private userService : UserService
    ) { }

    ngOnInit() {
        this.userService.getUser()
            .subscribe(result => {
                this.id = result.id;
                this.username = result.username;
                //this.password = result.password;
                this.email = result.email;
                this.lastname = result.lastname;
                this.firstname = result.firstname;
                //this.street = result.street;
                //this.id = result.id;
                //this.cp = result.cp;
            });
    }

}
