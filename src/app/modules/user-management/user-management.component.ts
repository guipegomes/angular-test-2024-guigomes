import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    ButtonComponent,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  @Input() title: string = "User Management";
}
