import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { TestKitEditComponent } from './test-kit-edit.component';
import { OrderService } from '../orderservice.service';
import { TestKit } from '../testkit.model';

describe('TestKitEditComponent', () => {
  let component: TestKitEditComponent;
  let fixture: ComponentFixture<TestKitEditComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(() => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['getTestKitById', 'updateTestKit']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [TestKitEditComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestKitEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the test kit successfully', () => {
    const testKit: TestKit = {
      id: 1,
      name: 'Test Kit',
      category: { name: 'Category 1', id: 1 },
      availability: true,
      brand: { name: 'Brand 1', id: 1 },
      popularity: 5,
      releaseDate: new Date('2022-01-01')
    };

    mockOrderService.getTestKitById.and.returnValue(of(testKit));

    component.ngOnInit();

    expect(mockOrderService.getTestKitById).toHaveBeenCalledWith('1');
    expect(component.testKit).toEqual(testKit);
  });

  it('should handle error when retrieving the test kit', () => {
    const errorMessage = 'Error retrieving test kit: Test Error';

    mockOrderService.getTestKitById.and.returnValue(throwError({ message: 'Test Error' }));

    component.ngOnInit();

    expect(mockOrderService.getTestKitById).toHaveBeenCalledWith('1');
    expect(component.errorMessage).toEqual(errorMessage);
  });

  it('should update the test kit successfully', () => {
    const updatedKit: TestKit = {
      id: 1,
      name: 'Updated Test Kit',
      category: { name: 'Category 1', id: 1 },
      availability: true,
      brand: { name: 'Brand 1', id: 1 },
      popularity: 5,
      releaseDate: new Date('2022-01-01')
    };

    mockOrderService.updateTestKit.and.returnValue(of(updatedKit));

    component.id = '1';
    component.testKit = { ...updatedKit };

    component.updateTestKit();

    expect(mockOrderService.updateTestKit).toHaveBeenCalledWith(1, component.testKit);
    expect(component.successMessage).toEqual('Order Updated Successfully.');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/testkits'], { queryParams: { message: component.successMessage } });
  });


  it('should handle error when updating the test kit', () => {
    const errorMessage = 'Error updating test kit: Test Error';
  
    spyOn(console, 'error');
    mockOrderService.updateTestKit.and.returnValue(throwError({ message: 'Test Error' }));
  
    component.id = '1';
    component.testKit = {id: 1,
      name: 'Updated Test Kit',
      category: { name: 'Category 1', id: 1 },
      availability: true,
      brand: { name: 'Brand 1', id: 1 },
      popularity: 5,
      releaseDate: new Date('2022-01-01')};
  
    component.updateTestKit();
  
    expect(mockOrderService.updateTestKit).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error updating test kit:', jasmine.any(Object));
  });
  
});
