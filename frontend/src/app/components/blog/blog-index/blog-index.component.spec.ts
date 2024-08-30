import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogIndexComponent } from './blog-index.component';

describe('BlogIndexComponent', () => {
  let component: BlogIndexComponent;
  let fixture: ComponentFixture<BlogIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogIndexComponent]
    });
    fixture = TestBed.createComponent(BlogIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
