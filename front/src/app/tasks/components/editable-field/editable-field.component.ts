import {
  Component,
  ContentChild,
  effect,
  input,
  signal,
  TemplateRef,
} from "@angular/core";

import { CommonModule } from "@angular/common";

@Component({
  selector: "app-editable-field",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="isEditMode(); else viewTemplate">
      <ng-container *ngTemplateOutlet="editTemplate"></ng-container>
    </ng-container>
    <ng-template #viewTemplate>
      <ng-container *ngTemplateOutlet="viewTemplateRef"></ng-container>
    </ng-template>
  `,
  styleUrl: "./editable-field.component.css",
})
export class EditableFieldComponent {
  isEditMode = input<boolean>();

  @ContentChild("viewMode", { static: true })
  viewTemplateRef!: TemplateRef<any>;
  @ContentChild("editMode", { static: true }) editTemplate!: TemplateRef<any>;

  mode: "view" | "edit" = "view";

  _editMode = signal<boolean>(false);
  editMode = this._editMode.asReadonly();

  get currentReference() {
    console.log(this.mode);
    return this.mode === "view" ? this.viewTemplateRef : this.editTemplate;
  }

  constructor() {
    effect(() => {
      this.mode = this.isEditMode() ? "edit" : "view";
    });
  }

  ngOnDestroy() {}
}
