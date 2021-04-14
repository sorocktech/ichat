import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EpidemicDetectPage } from './epidemic-detect.page';

describe('EpidemicDetectPage', () => {
  let component: EpidemicDetectPage;
  let fixture: ComponentFixture<EpidemicDetectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpidemicDetectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EpidemicDetectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
