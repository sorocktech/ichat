import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppversionPage } from './appversion.page';

describe('AppversionPage', () => {
  let component: AppversionPage;
  let fixture: ComponentFixture<AppversionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppversionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppversionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
