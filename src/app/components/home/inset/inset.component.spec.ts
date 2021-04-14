import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsetComponent } from './inset.component';

describe('InsetComponent', () => {
  let component: InsetComponent;
  let fixture: ComponentFixture<InsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
