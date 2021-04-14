import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateTypePage } from './rate-type.page';

describe('RateTypePage', () => {
  let component: RateTypePage;
  let fixture: ComponentFixture<RateTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RateTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
