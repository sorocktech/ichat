import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventReportPage } from './event-report.page';

describe('EventReportPage', () => {
  let component: EventReportPage;
  let fixture: ComponentFixture<EventReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
