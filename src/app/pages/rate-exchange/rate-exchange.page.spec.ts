import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateExchangePage } from './rate-exchange.page';

describe('RateExchangePage', () => {
  let component: RateExchangePage;
  let fixture: ComponentFixture<RateExchangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateExchangePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RateExchangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
