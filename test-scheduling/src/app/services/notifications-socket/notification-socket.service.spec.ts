import { TestBed } from '@angular/core/testing';

import { NotificationsSocketService } from './notification-socket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotificationSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: NotificationsSocketService = TestBed.get(NotificationsSocketService);
    expect(service).toBeTruthy();
  });
});
