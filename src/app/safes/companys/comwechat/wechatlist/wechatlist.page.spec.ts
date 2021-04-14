import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WechatlistPage } from './wechatlist.page';

describe('WechatlistPage', () => {
  let component: WechatlistPage;
  let fixture: ComponentFixture<WechatlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WechatlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
