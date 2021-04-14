import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComwechatPage } from './comwechat.page';

describe('ComwechatPage', () => {
  let component: ComwechatPage;
  let fixture: ComponentFixture<ComwechatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComwechatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComwechatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
