// test-kit-list.component.ts

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orderservice.service';
import { TestKit } from '../testkit.model';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'test-kit-list',
  templateUrl: './testkitlist.component.html',
  providers: [OrderService] // Add the OrderService as a provider
})
export class TestKitListComponent implements OnInit {
  testKits: any[] = [];
  filteredTestKits: any[];
  filterCategory: string  = '';
  filterAvailability: boolean  = false;
  filterBrand: string  = '';
  filterPopularity: string  = '';
  filterReleaseDate: string = '';
  filterName: string  = '';
  filterId: string   ='';
  filterParams: any = {};
  successMessage: string | null|undefined;

   constructor(private route: ActivatedRoute,
    private orderService: OrderService,private router: Router) {
    this.filteredTestKits = [];
    this.filterParams = {};
   }
   //construct the filter params only array items that are not null write the method 



   paginationConfig = {
    itemsPerPage: 3, // Number of items to display per page
    currentPage: 1, // Current page number
  }; 
  
  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      // Access the query parameters
      this.successMessage = params['message'];
      setTimeout(() => this.successMessage = '', 3000); // Clear the success message after 5 seconds
      // Do something with the query parameters
          const sortBy = params['sortBy'] || 'default'; // Replace 'default' with your default sorting option
          this.orderService.getTestKits(sortBy).subscribe(
            testKits => {
              // Assign the fetched test kits to your component variable
              this.testKits = testKits;
            },
            error => {
              console.error('Error retrieving test kits:', error);
            }
          );
      
      });   
  }

  key: keyof TestKit = 'id';
  reverse:boolean=false;
  sort(key: keyof TestKit): void {
    this.key = key;
    this.reverse = !this.reverse;
    this.testKits.sort((a: TestKit, b: TestKit) => {
      console.log("sort: " + this.key);
      const valueA = this.getPropertyValue(a, this.key);
      const valueB = this.getPropertyValue(b, this.key);
  
      if (valueA < valueB) {
        return this.reverse ? 1 : -1;
      } else if (valueA > valueB) {
        return this.reverse ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
  
  getPropertyValue(obj: TestKit, key: keyof TestKit): any {
    if (key === 'brand') {
      return obj.brand.name;
    } else if (key === 'category') {
      return obj.category.name;
    } else if (key === 'popularity') {
      return obj.popularity;
    } 
     else if (key === 'releaseDate') {
      return new Date(obj.releaseDate);
    } else {
      return obj[key];
    }
  }
  
    //map the params to the filter values and call the filterTestKits() method  

    Search() {
     if(this.filterCategory=='')
     {
      this.ngOnInit();
     }else{
      this.testKits = this.testKits.filter(res =>  res.category.name.toLocaleLowerCase().match(this.filterCategory.toLocaleLowerCase()) );
       
      
      
    }
  }

  
  navigateToEditPage(testKitId: number): void {
    this.router.navigate(['testkits', testKitId, 'edit']);
  }

  
  navigateToDeletePage(testKitId: number): void {
    this.router.navigate(['testkits', testKitId, 'delete']);
  }

  navigateToCreatePage(){
    this.router.navigate(['testkits', 'post']);

  }
  
  deleteTestKit(id:number): void {  
    this.orderService.deleteTestKit(id).subscribe(
      () => {
        console.log('Test kit deleted successfully');
        // Navigate to the test kit list page after deletion
        this.ngOnInit();

      },
      (error: any) => {
        console.error('Error deleting test kit:', error);
      }
    );
  }

    SearchBrand() {
     if(this.filterBrand=='')
     {
      this.ngOnInit();
     }else{
      this.testKits = this.testKits.filter(res =>  res.brand.name.toLocaleLowerCase().match(this.filterBrand.toLocaleLowerCase()) );
       
      
      
     }}
     searchAvailability(){  
      if(this.filterAvailability==false)
      {
       this.ngOnInit();
      }else{
        this.testKits = this.testKits.filter(res =>  res.availability==true );
      
      
        
      
     }}

     SearchPopularity(){
      if(this.filterPopularity=='')
      {
       this.ngOnInit();
      }else{
        this.testKits = this.testKits.filter(res =>  res.popularity==this.filterPopularity) ;
      
      
     }
    }
     SearchReleaseDate(){
      if(this.filterReleaseDate=='')
      {
       this.ngOnInit();
      }else{
        
        this.testKits = this.testKits.filter(res => res.releaseDate!=null &&  res.releaseDate.match(this.filterReleaseDate) );
        
      
     }}
     SearchName(){
      if(this.filterName=='')
      {
       this.ngOnInit();
      }else{
        this.testKits = this.testKits.filter(res =>  res.name.toLocaleLowerCase().match(this.filterName.toLocaleLowerCase()) );
      
      
      }
  
  }
  
  updateTestKit(id: number, updatedTestKit: TestKit): void {
    this.orderService.updateTestKit(id, updatedTestKit).subscribe(
      (updatedKit) => {
        // Handle the updated test kit
      },
      (error) => {
        console.error('Error updating test kit:', error);
      }
    );
  }
  
  

}
