import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryareasPage } from './countryareas.page';

describe('CountryareasPage', () => {
  let component: CountryareasPage;
  let fixture: ComponentFixture<CountryareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryareasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
