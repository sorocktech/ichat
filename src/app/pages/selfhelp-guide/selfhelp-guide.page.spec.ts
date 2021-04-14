import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfhelpGuidePage } from './selfhelp-guide.page';

describe('SelfhelpGuidePage', () => {
  let component: SelfhelpGuidePage;
  let fixture: ComponentFixture<SelfhelpGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfhelpGuidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfhelpGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
