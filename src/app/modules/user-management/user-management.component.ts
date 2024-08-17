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
  private visibleIndex: number | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser() {
    alert('Ação de adicionar clicada');
  }

  searchUser() {
    alert('Busca ainda não implementada!');
  }

  toggleDetails(index: number) {
    if(this.visibleIndex === index) {
      this.visibleIndex = null;
    } else {
      this.visibleIndex = index;
    }
  }

  isDetailed(index: number):boolean {
    return this.visibleIndex === index;
  }

  editUser() {
    alert('Ação de editar clicada.')
  }

  confirmDelete(userName: string) {
    const confirmar = prompt(`Ação de deletar clicada\n\nDigite "DELETE" para confirmar a exclusão do usuário ${userName}; Ou clique no botão 'Cancelar' para cancelar.`);

    if (confirmar === "DELETE") {
      this.deleteUser();
    } else {
      alert("Ação de deletar cancelada.")
    }

  }

  deleteUser() {
    alert("Confirmação de deletar clicada")
  }
}
