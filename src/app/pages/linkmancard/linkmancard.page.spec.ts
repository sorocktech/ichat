import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkmancardPage } from './linkmancard.page';

describe('LinkmancardPage', () => {
  let component: LinkmancardPage;
  let fixture: ComponentFixture<LinkmancardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkmancardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkmancardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
