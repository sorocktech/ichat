import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecurityWeeklyPage } from './security-weekly.page';

describe('SecurityWeeklyPage', () => {
  let component: SecurityWeeklyPage;
  let fixture: ComponentFixture<SecurityWeeklyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityWeeklyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityWeeklyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
