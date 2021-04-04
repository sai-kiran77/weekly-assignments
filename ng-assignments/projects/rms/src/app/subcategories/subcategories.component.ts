import { Component, OnInit } from '@angular/core';
import { Branch,subcategory } from '../catalog.interface'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { CatalogService } from '../catalog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  branchSelected:boolean = this.catalogService.branchSelected;
  currentBranch!:Branch;
  subcategories!: subcategory[];
  faArrowright = faChevronRight;
  categoryName:string;

  constructor(private catalogService:CatalogService,private route:ActivatedRoute) { 
    this.categoryName = this.route.snapshot.params.name
  }

  ngOnInit(): void {
    this.subcategories = this.catalogService.getSubCategories()
    this.currentBranch = this.catalogService.getCurrentBranch()
  }

}
