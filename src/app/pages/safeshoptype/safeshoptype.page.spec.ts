import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafeshoptypePage } from './safeshoptype.page';

describe('SafeshoptypePage', () => {
  let component: SafeshoptypePage;
  let fixture: ComponentFixture<SafeshoptypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeshoptypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafeshoptypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
