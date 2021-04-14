import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectcountryPage } from './selectcountry.page';

describe('SelectcountryPage', () => {
  let component: SelectcountryPage;
  let fixture: ComponentFixture<SelectcountryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectcountryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectcountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
