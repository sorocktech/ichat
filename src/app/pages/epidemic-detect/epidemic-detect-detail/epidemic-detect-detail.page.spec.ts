import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EpidemicDetectDetailPage } from './epidemic-detect-detail.page';

describe('EpidemicDetectDetailPage', () => {
  let component: EpidemicDetectDetailPage;
  let fixture: ComponentFixture<EpidemicDetectDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpidemicDetectDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EpidemicDetectDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
