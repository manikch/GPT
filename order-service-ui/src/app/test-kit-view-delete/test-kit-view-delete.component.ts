import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { OrderService } from '../orderservice.service';
import { TestKit } from '../testkit.model';


@Component({
  selector: 'app-test-kit-view-delete',
  templateUrl: './test-kit-view-delete.component.html',
  styleUrls: ['./test-kit-view-delete.component.css']
})
export class TestKitViewDeleteComponent implements OnInit{
  testKit: TestKit | null | undefined;
  errorMessage: string | undefined;
  id: string | null | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Fetch the test kit details using the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null &&  this.id!== undefined) {
    this.getTestKit(this.id);
    }
  }




  getTestKit(id: string): void {
    this.orderService.getTestKitById(id).subscribe(
      (testKit: any) => {
        this.testKit = testKit;
      },
      (error: any) => {
        console.error('Error retrieving test kit:', error);
      }
    );
  }
}


