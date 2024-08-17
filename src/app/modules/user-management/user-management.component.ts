import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})

export class UserManagementComponent implements OnInit {
  @Input() title: string = "User Management";

  users: User[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
