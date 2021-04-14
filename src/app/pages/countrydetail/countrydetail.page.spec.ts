import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountrydetailPage } from './countrydetail.page';

describe('CountrydetailPage', () => {
  let component: CountrydetailPage;
  let fixture: ComponentFixture<CountrydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrydetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountrydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
