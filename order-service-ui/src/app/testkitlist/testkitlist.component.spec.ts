import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TestKitListComponent } from './testkitlist.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../orderservice.service';
import { of ,throwError} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';



describe('TestKitListComponent', () => {
  let component: TestKitListComponent;
  let fixture: ComponentFixture<TestKitListComponent>;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestKitListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        { provide: Router, useValue: {} },
        { provide: OrderService, useValue: { getTestKits: () => of([]) } }
      ],      imports: [HttpClientModule,NgxPaginationModule,FormsModule,ReactiveFormsModule], // Add HttpClientModule to the 'imports' array

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitListComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    component.testKits = [
      { id: 1, name: 'Test Kit 1', category: { name: 'Category 1' }, availability: true, brand: { name: 'Brand 1' }, popularity: 5, releaseDate: '2022-01-01' },
      { id: 2, name: 'Test Kit 2', category: { name: 'Category 2' }, availability: false, brand: { name: 'Brand 2' }, popularity: 4, releaseDate: '2022-02-02' }
    ];
    fixture.detectChanges();
  }); 

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize test kits', () => {
    const testKits = [
      { id: 1, name: 'Test Kit 1', category: { name: 'Category 1' }, availability: true, brand: { name: 'Brand 1' }, popularity: 5, releaseDate: '2022-01-01' },
      { id: 2, name: 'Test Kit 2', category: { name: 'Category 2' }, availability: false, brand: { name: 'Brand 2' }, popularity: 4, releaseDate: '2022-02-02' }  
    ];
    spyOn(orderService, 'getTestKits').and.returnValue(of(testKits));

    fixture.detectChanges();
    expect(component.testKits).toEqual(testKits);
  });
 
  // Add more test cases for other methods

});
