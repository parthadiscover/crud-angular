import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Session } from '../Session';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  id: string = '';
  title: string = '';
  body: number = null;
  isLoadingResults = false;

  constructor(private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private session: Session) { }

  ngOnInit() {
    console.log("RT LNK :: " + this.router.url);
    this.productForm = this.formBuilder.group({
      'id': [null],
      'title': [null, Validators.required],
      'body': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addProduct(form)
      .subscribe(res => {
        let id = res['id'];
        console.log("Return Id " + id + "  -- " + res['title']);
        this.session.getStorage().set("data", res);
        this.isLoadingResults = false;
        this.router.navigate(['/product-details-status']);      
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
