import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTrendComponent } from './blog-trend.component';

describe('BlogTrendComponent', () => {
  let component: BlogTrendComponent;
  let fixture: ComponentFixture<BlogTrendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogTrendComponent]
    });
    fixture = TestBed.createComponent(BlogTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
