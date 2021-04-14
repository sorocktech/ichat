import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetpwdPage } from './resetpwd.page';

describe('ResetpwdPage', () => {
  let component: ResetpwdPage;
  let fixture: ComponentFixture<ResetpwdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpwdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
