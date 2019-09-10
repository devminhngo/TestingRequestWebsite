import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test Scheduler';

  constructor(private loginService:AuthenticationService, public cdRef:ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}