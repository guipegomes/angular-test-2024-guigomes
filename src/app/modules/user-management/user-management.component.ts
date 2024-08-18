import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data/data.service';
import { UserModalComponent } from '../../components/user-modal/user-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    UserModalComponent
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})

export class UserManagementComponent implements OnInit {
  @Input() title: string = "User Management";
  @ViewChild(UserModalComponent)
  userModal: UserModalComponent = new UserModalComponent;

  users: User[] = [];
  usersDisplayed: User [] = [];
  usersPerPage = 5;
  currentPage = 1;
  totalPages?: number;
  modalUser: User | null | undefined = undefined;
  private visibleIndex: number | null = null;
  action: (() => void) | null = null;
  buttonText: string = '';
  iconClass: string = '';
  isEdit: boolean = false; //Controla se é edição ou adição

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
      this.totalPages = Math.ceil(this.users.length / this.usersPerPage);
      this.updateUsersDisplayed();
    });
  }

  //Para a paginação -- Atualiza os usuários que serão mostrados
  updateUsersDisplayed(): void {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.usersDisplayed = this.users.slice(startIndex, endIndex)
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updateUsersDisplayed();
  }

  //Para o botão de MORE
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

  //Alertas básicos que devem ser atualizados com funções de serviço da API
  addUser() {
    alert('"Add new user" feature clicked.');
  }

  searchUser() {
    alert('"Search" feature is not yet implemented!');
  }

  editUser() {
    alert('"Save changes" feature clicked.')
  }

  //Realiza confirmações para deletar, chama função de deleção local e informa o usuário do resultado
  confirmDelete(user: User): void {
    const confirmar = prompt(`"Delete user" feature clicked.\n\nType 'DELETE' to confirm the deletion of user ${user.name}, or click the 'Cancel' button to abort.`);

    if (confirmar === "DELETE") {
      this.dataService.deleteUser(user.id).subscribe({
        next: () => {
          this.deleteUserLocally(user.id);
          alert(`"Delete" feature clicked.\n\nUser ${user.name} was deleted locally.`);
        },
        error: (error) => {
          console.error('Error deleting user: ', error);
          alert("An error occurred while deleting the user. The operation was not completed.")
        }
      })
    } else {
      alert('"Delete" action cancelled.')
    }
  }

  //Gera novo array sem o usuário "deletado"
  private deleteUserLocally(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.updateUsersDisplayed();
  }

  //Atribui valores às variáveis que serão usadas no user-modal
  setupModal(isEdit: boolean, action: () => void, user?: User) {
    this.modalUser = user;
    this.action = action;
    this.isEdit = isEdit;
    this.buttonText = isEdit ? 'Save changes' : 'Add user';
    this.iconClass = isEdit ? 'fa fa-user-pen' : 'fa fa-user-plus';

    /*quando a página era atualizada o botão não funcionava
    na primeira vez em que era clicado, então cdr força a detecção de mudanças para garantir que o modal abra
    neste caso*/
    this.cdr.detectChanges();

    this.userModal.show = !this.userModal.show;
  }

}
