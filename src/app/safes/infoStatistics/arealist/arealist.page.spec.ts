import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArealistPage } from './arealist.page';

describe('ArealistPage', () => {
  let component: ArealistPage;
  let fixture: ComponentFixture<ArealistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArealistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArealistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
