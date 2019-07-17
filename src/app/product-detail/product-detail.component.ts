import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { Session } from '../Session';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product = { userId: null, id: 0, title: '', body: '' };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private session: Session) { }

  ngOnInit() {
    console.log("rt trans :: " + this.route.snapshot.params['id']);
    if (!this.route.snapshot.params['id']) {
      console.log("TruEEEE");
      this.getEditedProduct();
    } else {
      this.getProductDetails(this.route.snapshot.params['id']);
    }      
  }

  getProductDetails(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        this.product = data;
        console.log(this.product);
        this.isLoadingResults = false;
      });
  }

  getEditedProduct() {
    console.log(this.session.getStorage().get('data'));
    this.product = this.session.getStorage().get('data');
    this.isLoadingResults = false;
  }

  deleteProduct(id) {
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/products-remove',id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }


}
