import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TestKitPostComponent } from './test-kit-post.component';
import { OrderService } from '../orderservice.service';
import { TestKit } from '../testkit.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestKitPostComponent', () => {
  let component: TestKitPostComponent;
  let fixture: ComponentFixture<TestKitPostComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const orderServiceSpyObj = jasmine.createSpyObj('OrderService', ['createTestKit']);

    await TestBed.configureTestingModule({
      declarations: [TestKitPostComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1' // Provide the desired parameter value here
              }
            }
          }
        },
        { provide: OrderService, useValue: orderServiceSpyObj },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitPostComponent);
    component = fixture.componentInstance;
    orderServiceSpy = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create a test kit successfully', () => {
    const testKit: TestKit = {
      id: 1,
      name: 'Test Kit 1',
      category: { name: 'Category 1', id: 1 },
      availability: true,
      brand: { name: 'Brand 1', id: 1 },
      popularity: 5,
      releaseDate: new Date('2022-01-01')
    };
    orderServiceSpy.createTestKit.and.returnValue(of(testKit));

    // Set form values
    component.orderForm.controls['name'].setValue('Test Kit 1');
    component.orderForm.controls['availability'].setValue(true);
    component.orderForm.controls['brand'].setValue('Brand 1');
    component.orderForm.controls['popularity'].setValue(5);
    component.orderForm.controls['category'].setValue('Category 1');
    component.orderForm.controls['releaseDate'].setValue(new Date());

    // Trigger the createTestKit method
    component.createTestKit();

    expect(orderServiceSpy.createTestKit).toHaveBeenCalledWith({
      id: 0,
      name: 'Test Kit 1',
      availability: true,
      brand: {
        id: 0,
        name: 'Brand 1'
      },
      category: {
        id: 0,
        name: 'Category 1'
      },
      popularity: 5,
      releaseDate: jasmine.any(Date) // Use jasmine.any to match any Date value
    });

    // Additional assertions
  });
});
