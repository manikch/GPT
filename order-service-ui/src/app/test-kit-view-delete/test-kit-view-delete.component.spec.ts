import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';

import { TestKitViewDeleteComponent } from './test-kit-view-delete.component';
import { OrderService } from '../orderservice.service';
import { TestKit } from '../testkit.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestKitViewDeleteComponent', () => {
  let component: TestKitViewDeleteComponent;
  let fixture: ComponentFixture<TestKitViewDeleteComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockTestKit: TestKit = {
    id: 1,
    name: 'Test Kit',
    category: { id: 1, name: 'Category 1' },
    availability: true,
    brand: { id: 1, name: 'Brand 1' },
    popularity: 5,
    releaseDate: new Date('2022-01-01T00:00:00.000Z')
  };

  beforeEach(async () => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['getTestKitById']);

    await TestBed.configureTestingModule({
      declarations: [TestKitViewDeleteComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: Router, useValue: {} },
        { provide: OrderService, useValue: mockOrderService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitViewDeleteComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the test kit details on initialization', () => {

    spyOn(mockOrderService, 'getTestKitById').and.returnValue(of(mockTestKit));

    //expect(mockOrderService.getTestKitById).toHaveBeenCalledWith('1');
    expect(component.testKit).toEqual(mockTestKit);
  });
  
  

  it('should handle error when fetching test kit details', fakeAsync(() => {
    const errorMessage = 'Error retrieving test kit';
    mockOrderService.getTestKitById.and.returnValue(throwError(errorMessage));
    spyOn(console, 'error');
  
    component.getTestKit('1');
    tick();
  
    expect(mockOrderService.getTestKitById).toHaveBeenCalledWith('1');
    expect(console.error).toHaveBeenCalledWith('Error retrieving test kit:', errorMessage);
//    expect(component.errorMessage).toBe(errorMessage);
  }));
  
  
  // Add more test cases to cover different scenarios, if/else conditions, and exception handling
});
