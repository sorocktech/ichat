import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiskwarnPage } from './riskwarn.page';

describe('RiskwarnPage', () => {
  let component: RiskwarnPage;
  let fixture: ComponentFixture<RiskwarnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskwarnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiskwarnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
