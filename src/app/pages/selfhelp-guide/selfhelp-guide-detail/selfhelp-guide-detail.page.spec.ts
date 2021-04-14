import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfhelpGuideDetailPage } from './selfhelp-guide-detail.page';

describe('SelfhelpGuideDetailPage', () => {
  let component: SelfhelpGuideDetailPage;
  let fixture: ComponentFixture<SelfhelpGuideDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfhelpGuideDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfhelpGuideDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
