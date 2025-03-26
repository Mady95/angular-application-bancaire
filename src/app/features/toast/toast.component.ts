import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastService} from '../../core/services/toast.service';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toast"
         class="toast-container position-fixed start-50 translate-middle-x p-3"
         style="top: 70px; z-index: 1050;">
      <div class="toast show text-white" [ngClass]="{
        'bg-success': toast.type === 'success',
        'bg-danger': toast.type === 'error',
        'bg-info': toast.type === 'info'
      }">
        <div class="toast-body">
          {{ toast.message }}
        </div>
      </div>
    </div>
  `
})
export class ToastComponent {
  toast: { message: string, type: 'success' | 'error' | 'info' } | null = null;

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(toast => {
      this.toast = toast;
    });
  }
}
