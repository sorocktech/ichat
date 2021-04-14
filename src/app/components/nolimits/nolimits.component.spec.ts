import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NolimitsComponent } from './nolimits.component';

describe('NolimitsComponent', () => {
  let component: NolimitsComponent;
  let fixture: ComponentFixture<NolimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NolimitsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NolimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
