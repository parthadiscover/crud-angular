import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product';
import { Session } from '../Session';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  id: number = null;
  prod_name: string = '';
  prod_desc: string = '';
  prod_price: number = null;
  isLoadingResults = false;

  editedProduct : Product = { userId: null, id: 0, title: '', body: '' };

  constructor(private router: Router, private route: ActivatedRoute,
              private api: ApiService, private formBuilder: FormBuilder,
              private session: Session) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'title': [null, Validators.required],
      'body': [null, Validators.required]      
    });
  }


  getProduct(id) {
    
    console.log("Edit GetProduct Called -- "+id);
    this.api.getProduct(id).subscribe(data => {
      this.id = data.id;
      this.productForm.setValue({
        id: data.id,
        title: data.title,
        body: data.body,
        
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateProduct(this.id, form)
      .subscribe(res => {
        let id = res['id'];
        this.isLoadingResults = false;
        console.log("IID " + id);
        console.log("UP TITLE " + res['title']);

        this.session.getStorage().set("data", res);
        this.router.navigate(['/product-details-status']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  productDetails() {
    this.router.navigate(['/product-details', this.id]);
  }

}
