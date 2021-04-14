import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MsgCountInvestmentPage } from './msg-count-investment.page';

describe('MsgCountInvestmentPage', () => {
  let component: MsgCountInvestmentPage;
  let fixture: ComponentFixture<MsgCountInvestmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgCountInvestmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MsgCountInvestmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
