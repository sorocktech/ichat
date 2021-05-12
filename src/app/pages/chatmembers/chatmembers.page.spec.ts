import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatmembersPage } from './chatmembers.page';

describe('ChatmembersPage', () => {
  let component: ChatmembersPage;
  let fixture: ComponentFixture<ChatmembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatmembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatmembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
