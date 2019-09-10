import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NotificationsSocketService } from '../../services/notifications-socket/notification-socket.service';
import { Notification } from '../../interfaces/notifications';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],

})
export class NotificationsComponent implements OnInit {

  private user: any;
  private message: any;

  constructor(
// tslint:disable-next-line: variable-name
    private _notifications: NotificationsService,
    private notificationsSocketService: NotificationsSocketService,
  ) {}

ngOnInit() {
// Here we listen to an event from the socket.io.server
  this.notificationsSocketService.listen('Test Event').subscribe((data: Notification) => {

      this.message = data.message;
      this.user = data.user;
      this.notify();
    });
  }

  notify() {
    this._notifications.error(
      this.user,
      this.message,
      {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
      });
    }
}
