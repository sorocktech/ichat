import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatMessagePage } from './chat-message.page';

describe('ChatMessagePage', () => {
  let component: ChatMessagePage;
  let fixture: ComponentFixture<ChatMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
