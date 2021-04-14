import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedbacklistPage } from './feedbacklist.page';

describe('FeedbacklistPage', () => {
  let component: FeedbacklistPage;
  let fixture: ComponentFixture<FeedbacklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacklistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbacklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
