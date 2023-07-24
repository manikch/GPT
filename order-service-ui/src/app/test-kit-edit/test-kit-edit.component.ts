import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router  } from '@angular/router';

import { OrderService } from '../orderservice.service';
import { TestKit } from '../testkit.model';
@Component({
  selector: 'app-testkit-edit',
  templateUrl: './test-kit-edit.component.html',
  styleUrls: ['./test-kit-edit.component.css']
})
export class TestKitEditComponent implements OnInit {
  successMessage: string | undefined;

  testKit: TestKit | null | undefined;
  errorMessage: string | undefined;
  id: string | null | undefined;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
  ) { 
  }
  getRouter() {
    return this.router;
  }
  
  ngOnInit() {
    this.id= this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {

    this.getTestKit(this.id);
    }
  }

  getTestKit(id: string) {
    this.orderService.getTestKitById(id)
      .subscribe(
        (testKit: TestKit) => {
          this.testKit = testKit;
        },
        (error) => {
          this.errorMessage = 'Error retrieving test kit: ' + error.message;
        }
      );
  }

  updateTestKit(): void {
    if (this.id!== null && this.id!== undefined && this.testKit !== null  && this.testKit !== undefined   ) {
    const numId = parseInt(this.id, 10); // Convert the string to an integer using base 10
    console.log("numId: " + numId + " testKit: " + this.testKit );
    this.orderService.updateTestKit(numId, this.testKit).subscribe( 
      (updatedKit) => {
        // Handle the updated test kit

        this.successMessage = 'Order Updated Successfully.';
        const queryParams: { message: string } = {
          message: this.successMessage
        };        
          this.router.navigate(['/testkits'], { queryParams: queryParams });
         },
      (error) => {
        console.error('Error updating test kit:', error);
    });
    }
 }

}