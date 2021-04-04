import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { CategoriesComponent } from './categories/categories.component'
import { SubcategoriesComponent } from './subcategories/subcategories.component'

const routes: Routes = [
  { path: 'categories/:location/:branch', component: CategoriesComponent },
  { path: 'subcateogries/:name', component: SubcategoriesComponent },
  { path: "", component: LandingPageComponent },
  { path: "*", component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
