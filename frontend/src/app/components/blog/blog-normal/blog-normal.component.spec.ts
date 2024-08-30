import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNormalComponent } from './blog-normal.component';

describe('BlogNormalComponent', () => {
  let component: BlogNormalComponent;
  let fixture: ComponentFixture<BlogNormalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogNormalComponent]
    });
    fixture = TestBed.createComponent(BlogNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
