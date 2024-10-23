import { Component, Input } from '@angular/core';
import { Field } from '../../interfaces/field.component.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
 @Input({required: true}) formTitle!: string; 
 @Input({required: true}) formButtonText!: string;
 @Input({required: true}) formLinkText! : string;
 @Input({required: true}) formLink! : string;
 @Input({required: true}) formOptionText! : string;
 @Input({required: true}) inputList! :Field[];
}
