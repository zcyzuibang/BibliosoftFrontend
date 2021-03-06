import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {Message, MessageService} from "../../../utils/message.service";
import {StateService} from "../../../utils/state.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css', '../../../login.css']
})
export class AdminLoginComponent implements OnInit {
  user: string;
  pass: string;

  constructor(
    private stateService: StateService,
    private messageService: MessageService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stateService.need_not_login();
  }

  admin_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass, 1)
      .then(res => {
        this.stateService.login('admin', res, this.activatedRoute.snapshot.queryParams['path'])
          .catch(err=> {
            console.log(err);
            this.messageService.messages.push(new Message(err, 'danger'));
          });
      }).catch((err) => {
        this.messageService.messages.push(new Message(err.error.msg, 'danger'));
      });
  }

  want_reset_psw() {
    // todo: finish it
  }
}
