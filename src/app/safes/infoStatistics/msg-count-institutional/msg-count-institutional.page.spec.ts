import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MsgCountInstitutionalPage } from './msg-count-institutional.page';

describe('MsgCountInstitutionalPage', () => {
  let component: MsgCountInstitutionalPage;
  let fixture: ComponentFixture<MsgCountInstitutionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgCountInstitutionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MsgCountInstitutionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
