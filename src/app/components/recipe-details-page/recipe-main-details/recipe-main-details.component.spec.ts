import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeMainDetailsComponent } from './recipe-main-details.component';

describe('RecipeMainDetailsComponent', () => {
  let component: RecipeMainDetailsComponent;
  let fixture: ComponentFixture<RecipeMainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeMainDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeMainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
