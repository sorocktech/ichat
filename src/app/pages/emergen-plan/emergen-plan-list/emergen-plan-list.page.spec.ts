import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmergenPlanListPage } from './emergen-plan-list.page';

describe('EmergenPlanListPage', () => {
  let component: EmergenPlanListPage;
  let fixture: ComponentFixture<EmergenPlanListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenPlanListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmergenPlanListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
