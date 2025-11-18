import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesPaginationComponent } from './recipes-pagination.component';

describe('RecipesPaginationComponent', () => {
  let component: RecipesPaginationComponent;
  let fixture: ComponentFixture<RecipesPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
