import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNewComponent } from './blog-new.component';

describe('BlogNewComponent', () => {
  let component: BlogNewComponent;
  let fixture: ComponentFixture<BlogNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogNewComponent]
    });
    fixture = TestBed.createComponent(BlogNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
