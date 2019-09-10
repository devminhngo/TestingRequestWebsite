import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { sideNavAnimation, sideNavContainerAnimation } from './sidenav.animation';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [sideNavAnimation, sideNavContainerAnimation]
})

export class NavigationComponent implements OnInit {
  title = 'Navigation';
  isOpen = true;
  showWorkRequestSubMenu: boolean = false;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver, private loginService:AuthenticationService) {}

  menus = [
    { status: 'Task ID 5cc3f5f2670c4e3e1cf004dd', message: 'This task has been approved by the admin.' },
    { status: 'Task ID 5cc3ca745b24c847f0bc2cdb', message: 'This task has been denied.'},
    { status: 'Jdoe 1000.', message: 'Task ID 5cc3ca745b24c847f0bc2cdb has been approved.' },
    { status: 'Task Denied.', message: 'Task ID: 000003' },
    { status: 'Task ID 5cc3f5f2670c4e3e1cf004dd', message: 'This task has been approved.' },
  ];

  toggle() {
    this.isOpen = !this.isOpen;
    this.closesubmenus();
  }

  closesubmenus() {
    if(this.showWorkRequestSubMenu == true)
      this.showWorkRequestSubMenu = false;
  }

  toggleWorkRequestSubMenu(){
    // Checks if sidebar is not open and calls toggle() if it isnt
    if(!this.isOpen)
      this.toggle();

    this.showWorkRequestSubMenu = !this.showWorkRequestSubMenu;
  }

  ngOnInit() {
  }

}
