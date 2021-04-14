import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiskwarnDetailPage } from './riskwarn-detail.page';

describe('RiskwarnDetailPage', () => {
  let component: RiskwarnDetailPage;
  let fixture: ComponentFixture<RiskwarnDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskwarnDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiskwarnDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
