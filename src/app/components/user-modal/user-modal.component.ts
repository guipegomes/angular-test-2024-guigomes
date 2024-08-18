import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent {
  @Input() user?: User;
  @Input() isEdit: boolean = false;
  @Input() action?: (()=>void) | null = null;
  @Input() buttonText: string = '';
  @Input() iconClass: string = '';

  show: boolean = false;

  saveAddChanges(): void {
    if (this.action) {
      this.action();
    }
    this.show = !this.show;
  }

  cancelChanges(): void {
    if(confirm("Unsaved changes will be lost. Are you sure you want to continue?")) {
      this.show = !this.show
    }
  }

}
