import { Component } from '@angular/core';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { CatalogService } from './catalog.service'
import { Branch, Catalog, Location } from './catalog.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rms';
  faArrowDown = faChevronDown;
  faArrowright = faChevronRight;
  catalog!: Catalog;
  locations!: Location[];
  currentBranch!: Branch;
  branchSelected: boolean = false;

  constructor(private catalogService: CatalogService, private router: Router) {

  }

  locationHandler(location:Location){
    this.branchHandler(location.branches[0].branch_id,location.dealers_id)
  }

  branchHandler(branchId: string, locationId: string) {
    this.catalogService.branchSelected = true;
    this.locations.find(object => {
      if (object.dealers_id === locationId) {
        const currentBranchIndex = object.branches.findIndex(obj => obj.branch_id === branchId)
        if (currentBranchIndex >= 0)
          this.currentBranch = object.branches[currentBranchIndex]
        else {
          this.currentBranch = {
            branch_id: '',
            name: '',
            categories: []
          }
        }
      }
    })
    this.catalogService.setActiveCategoryPath(`categories/${locationId}/${branchId}`)
    this.catalogService.setCurrentBranch(this.currentBranch)
    this.router.navigate(['/categories', locationId, branchId])
  }

  ngOnInit() {
    this.catalogService.getCatalog().subscribe((catalog) => {
      this.catalog = catalog;
      this.locations = catalog.data.locations;
      console.log(catalog)
    })
  }
}