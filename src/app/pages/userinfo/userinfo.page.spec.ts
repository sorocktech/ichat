import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserinfoPage } from './userinfo.page';

describe('UserinfoPage', () => {
  let component: UserinfoPage;
  let fixture: ComponentFixture<UserinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
