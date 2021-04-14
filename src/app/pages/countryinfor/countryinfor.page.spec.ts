import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryinforPage } from './countryinfor.page';

describe('CountryinforPage', () => {
  let component: CountryinforPage;
  let fixture: ComponentFixture<CountryinforPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryinforPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryinforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
