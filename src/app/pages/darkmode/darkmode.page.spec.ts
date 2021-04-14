import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarkmodePage } from './darkmode.page';

describe('DarkmodePage', () => {
  let component: DarkmodePage;
  let fixture: ComponentFixture<DarkmodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarkmodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarkmodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
