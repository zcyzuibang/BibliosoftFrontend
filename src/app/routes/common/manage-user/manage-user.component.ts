import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {User} from "../../../utils/DataStructs/User";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {Message, MessageService} from "../../../utils/message.service";
import {StateService} from "../../../utils/state.service";
import {FormControl, Validators} from "@angular/forms";
import {Matcher} from "../../../utils/matcher";

const waitTime = 5000;

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  role: string;
  managedRole: string;

  data: Array<User> = [];

  searchText: string;

  addAccount = new User('', '');
  addPassword: string;

  requiredFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  matcher = new Matcher();

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private stateService: StateService,
    public apiService: ApiService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(res => {
        const role = res.get('role');
        if (role === 'admin' || role === 'librarian') {
          this.role = role;
          this.managedRole = role === 'admin' ? 'librarian' : 'reader';
        } else {
          console.error('404');
          this.stateService.back_home();
        }
      });
    this.stateService.only(this.role);
  }

  reset_password($event: Event) {
    const tr = $event.srcElement.closest('tr');
    console.log(tr);
    const username = tr.children[2].textContent;
    console.log(username);

    const new_pass = prompt(`please input new password for "${username}"`, this.managedRole === 'reader' ? '12345678' : '00010001');
    if (new_pass) {
      this.apiService.reset_password(this.managedRole, username, new_pass)
        .then(() => {
          this.messageService.messages.push(new Message(`<strong>${username}</strong> Success to reset password`, 'success'));
        }).catch(err => {
        this.messageService.messages.push(new Message(`<strong>${username}</strong> fail to reset password`, 'danger'));
        console.error(err);
      });
    }
    // else do nothing but return.
  }

  // remove_user($event: Event) {
  //   const tr = $event.srcElement.parentElement.parentNode;
  //   const username = tr.childNodes[2].textContent;
  //   const confirm_remove = confirm(`Are you sure to delete "${username}"?`);
  //   if (confirm_remove) {
  //     // remove user
  //   }
  // }

  search_user() {
    this.apiService.get_account(this.managedRole, this.searchText)
      .then(res => {
        this.data = res;
      }).catch(err => {
      console.error(err);
    });
  }

  submit_register() {
    console.log(this.addAccount);
    this.apiService.add_account(this.managedRole, this.addPassword, this.addAccount)
      .then((res) => {
        if (res) {
          this.messageService.messages.push(new Message('register account success!', 'success'));
          setTimeout(location.reload, waitTime);
        } else {
          this.messageService.messages.push(new Message('this username may be used by other user', 'danger'));
        }
      }).catch(err => {
        console.error(err);
      });
  }
}
