import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatGroupChatPage } from './creat-group-chat.page';

describe('CreatGroupChatPage', () => {
  let component: CreatGroupChatPage;
  let fixture: ComponentFixture<CreatGroupChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatGroupChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatGroupChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
