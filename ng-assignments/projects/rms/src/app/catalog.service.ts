import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch, Catalog, subcategory } from './catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  branchSelected:boolean = false;
  currentBranch!: Branch;
  subcategories!:subcategory[];
  activeCategoriesPath = '';
  activeSubCategoriesPath = '';
  constructor(private http: HttpClient) { }

  getCatalog(): Observable<Catalog> {
    return this.http.get<Catalog>('/assets/catalog.json');
  }

  setCurrentBranch(currentBranch: Branch) {
    this.currentBranch = currentBranch;
  }

  getCurrentBranch(): Branch {
    return this.currentBranch
  }

  setSubCategories(subcategories:subcategory[]){
    this.subcategories = subcategories
  }

  getSubCategories():subcategory[]{
    return this.subcategories
  }

  setActiveCategoryPath(path:string){
    this.activeCategoriesPath = path;
  }

  setActiveSubCategoryPath(path:string){
    this.activeSubCategoriesPath = path;
  }

  getActiveCategoriesPath(){
    return this.activeCategoriesPath;
  }

  getActiveSubCategoryPath(){
    return this.activeSubCategoriesPath;
  }

}
