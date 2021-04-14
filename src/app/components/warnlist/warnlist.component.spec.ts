import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarnlistComponent } from './warnlist.component';

describe('WarnlistComponent', () => {
  let component: WarnlistComponent;
  let fixture: ComponentFixture<WarnlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarnlistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarnlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
