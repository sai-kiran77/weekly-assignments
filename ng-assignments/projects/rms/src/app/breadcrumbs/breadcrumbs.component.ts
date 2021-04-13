import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  constructor(private catalog:CatalogService ) { }

  getCurrentCategoriesRoute() {
    console.log(this.catalog.getActiveCategoriesPath());
    return this.catalog.getActiveCategoriesPath()
  }

  getCurrentSubCategoriesPath(){
    console.log(this.catalog.getActiveSubCategoryPath());
    return this.catalog.getActiveSubCategoryPath()
    
  }

  ngOnInit(): void {
  }

}
