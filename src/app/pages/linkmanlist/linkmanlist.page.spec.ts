import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkmanlistPage } from './linkmanlist.page';

describe('LinkmanlistPage', () => {
  let component: LinkmanlistPage;
  let fixture: ComponentFixture<LinkmanlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkmanlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkmanlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
