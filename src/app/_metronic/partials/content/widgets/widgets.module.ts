import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg';
// Advanced Tables
//REMOVED
// Base Tables
//REMOVED// Lists
import { ListsWidget1Component } from './lists/lists-widget1/lists-widget1.component';
import { ListsWidget3Component } from './lists/lists-widget3/lists-widget3.component';
import { ListsWidget4Component } from './lists/lists-widget4/lists-widget4.component';
import { ListsWidget8Component } from './lists/lists-widget8/lists-widget8.component';
// Mixed

// Tiles
//REMOVED
// Other
import { DropdownMenusModule } from '../dropdown-menus/dropdown-menus.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ListsWidget2Component } from './lists/lists-widget2/lists-widget2.component';
import { ListsWidget5Component } from './lists/lists-widget5/lists-widget5.component';
import { ListsWidget6Component } from './lists/lists-widget6/lists-widget6.component';
import { ListsWidget7Component } from './lists/lists-widget7/lists-widget7.component';




@NgModule({
  declarations: [
    // Advanced Tables
    //REMOVED
    // Base Tables
//REMOVE
    // Lists
    ListsWidget1Component,
    ListsWidget3Component,
    ListsWidget4Component,
    ListsWidget8Component,
    // Mixed
   
    // Tiles,
    //REMOVED
    // Other
    ListsWidget2Component,
    ListsWidget5Component,
    ListsWidget6Component,
    ListsWidget7Component,
    
   
  
    
  ],
  imports: [
    CommonModule,
    DropdownMenusModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
  ],
  exports: [
    // Advanced Tables
    //REMOVED
    // Base Tables
   //REMOVE
    // Lists
    ListsWidget1Component,
    ListsWidget3Component,
    ListsWidget4Component,
    ListsWidget8Component,
    // Mixed
    
    // Tiles,
    //REMOVED
    // Other
    ListsWidget2Component,
    ListsWidget5Component,
    ListsWidget6Component,
    ListsWidget7Component,
    
    
   
   
  ],
})
export class WidgetsModule {}
