import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventTypeListPage } from './event-type-list.page';

describe('EventTypeListPage', () => {
  let component: EventTypeListPage;
  let fixture: ComponentFixture<EventTypeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTypeListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventTypeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
