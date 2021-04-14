import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EpidemicReportPage } from './epidemic-report.page';

describe('EpidemicReportPage', () => {
  let component: EpidemicReportPage;
  let fixture: ComponentFixture<EpidemicReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpidemicReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EpidemicReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
