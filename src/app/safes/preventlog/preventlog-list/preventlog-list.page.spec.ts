import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreventlogListPage } from './preventlog-list.page';

describe('PreventlogListPage', () => {
  let component: PreventlogListPage;
  let fixture: ComponentFixture<PreventlogListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventlogListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreventlogListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
