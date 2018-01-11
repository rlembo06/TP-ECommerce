import { Component, OnInit } from '@angular/core';
import { Category } from '../../class/category';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin.category.component.html',
  providers: [AdminService]
})
export class AdminCategoryComponent implements OnInit {

    public category: Category;

    public id: number;
    public libelle: string;

    public libelleCreate_ctrl: FormControl;
    public createCategoryForm: FormGroup;

    constructor(
        private formBulder: FormBuilder,
        private adminService: AdminService
    ) { }

    ngOnInit() {
        this.libelleCreate_ctrl = this.formBulder.control('', Validators.required);

        this.createCategoryForm = this.formBulder.group({
            libelle: this.libelleCreate_ctrl
        });
    }

    createCategory() {
        console.log(this.createCategoryForm.value);
        this.category = this.createCategoryForm.value;

        this.adminService.createCategory(this.category)
            .subscribe(result => {
                alert(result);
            });
    }
}
