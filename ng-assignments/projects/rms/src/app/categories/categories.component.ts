import { Component, OnInit } from '@angular/core';
import { Branch, Location, subcategory,Category } from '../catalog.interface';
import { CatalogService } from '../catalog.service';
import { ActivatedRoute, Router } from '@angular/router'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  branchSelected = this.catalogService.branchSelected;
  locations!: Location[];
  currentBranch!: Branch;
  faArrowright = faChevronRight;

  constructor(private catalogService: CatalogService, private router: Router, private route: ActivatedRoute) {
  }

  categoryClickHandler(category: Category) {
    this.catalogService.setSubCategories(category.subcategories);
    this.catalogService.setActiveSubCategoryPath(`subcateogries/${category.name}`)
    this.router.navigate(['/subcateogries',category.name])
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.branchSelected = this.catalogService.branchSelected;
      this.currentBranch = this.catalogService.getCurrentBranch();
    })
  }
}