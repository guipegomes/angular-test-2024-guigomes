import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() id: string = '';
  @Input() iconClass: string= '';
  @Input() action: (() => void) | null = null;

  onClick(): void {
    if (this.action) {
      this.action();
    }
  }
}
