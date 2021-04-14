import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinGroupPage } from './join-group.page';

describe('JoinGroupPage', () => {
  let component: JoinGroupPage;
  let fixture: ComponentFixture<JoinGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
