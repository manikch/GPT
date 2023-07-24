import { Component } from '@angular/core';
import { TestKit } from '../testkit.model';
import { OrderService } from '../orderservice.service';
import { Brand } from '../Brand.model';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-test-kit-post',
  templateUrl: './test-kit-post.component.html',
  styleUrls: ['./test-kit-post.component.css']
})
export class TestKitPostComponent {
  orderForm: FormGroup = new FormGroup({});


  isLoading: boolean = false;

  testKit: TestKit = {
    id: 0,
    name: '',
    availability: false,
    brand: {
      id: 0,
      name: ''
    },
    category: {
      id: 0,
      name: ''
    },   
     popularity: 0,
    releaseDate: new Date()
  };
  errorMessage: string = '';

  ngOnInit() :void {
    this.orderForm = this.formBuilder.group({
      name: [, Validators.required],
      availability: [false, Validators.required],
      brand: ['', Validators.required],
      popularity: [0, Validators.required],
      category : ['', Validators.required],
      releaseDate: [new Date(), Validators.required]

      
    });
  }
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router) {}
        
  createTestKit(): void {
     
    if (this.orderForm.invalid) {
      this.errorMessage = 'Please fill in all the required fields.';
      console.log('Test kit created  is not successfully:');
      return ;
    }  

    const testKit: TestKit = {
      id: 0,
      name: this.orderForm.value.name,
      availability: this.orderForm.value.availability,
      brand: {
        id:0, 
        name:this.orderForm.value.brand
      },
      category: {
        id: 0,
        name: this.orderForm.value.category},
      popularity: this.orderForm.value.popularity,
      releaseDate: this.orderForm.value.releaseDate

    };

    this.isLoading = true;
    this.errorMessage = '';

    //const orderData = this.orderForm.value;
      // Ensure the test kit ID is empty when creating a new test kit
    this.orderService.createTestKit(testKit).subscribe(

      (createdTestKit: TestKit) => {
        console.log('Test kit created successfully:', createdTestKit);
        this.orderForm.reset();

        this.router.navigate(['testkits']);
      //console.log('Test kit created successfully:'+orderData.name);


        // Handle any additional logic after successful creation
      },
      (error) => {
        console.error('Error creating test kit:', error);
        // Handle error case
      }
    );
  }

}
