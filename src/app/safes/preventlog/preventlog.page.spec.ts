import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreventlogPage } from './preventlog.page';

describe('PreventlogPage', () => {
  let component: PreventlogPage;
  let fixture: ComponentFixture<PreventlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreventlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
