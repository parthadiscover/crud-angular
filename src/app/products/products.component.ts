import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { Session } from '../Session';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title'];
  data: Product[] = [];
  isLoadingResults = true;


  constructor(private api: ApiService, private route: ActivatedRoute, private session: Session) { }

  ngOnInit() {

 /*   console.log(" route path " + this.route.snapshot.params['method']);
    let method = this.route.snapshot.params['method'];
    if (method == true) {



    } else {*/
      this.api.getProducts()
        .subscribe(res => {
          console.log(res);
          this.data = res;
          this.filterDelete();
          console.log(this.data);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
 //   }
  }

  filterDelete() {
    let _id = this.route.snapshot.params['id'];
    console.log("Chech _id :" + _id);
    if (_id) {
      console.log("IS DELETE--- " + this.route.snapshot.params['id']);
      let tempData = this.data;
      let index = tempData.findIndex(n => n.id == _id);
      console.log("Removing Index " + index);
      this.data.splice(index,1);      
    }
  }
}
