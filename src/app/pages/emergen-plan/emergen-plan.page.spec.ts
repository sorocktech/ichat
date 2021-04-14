import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmergenPlanPage } from './emergen-plan.page';

describe('EmergenPlanPage', () => {
  let component: EmergenPlanPage;
  let fixture: ComponentFixture<EmergenPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmergenPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
