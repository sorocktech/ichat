import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyMapPointPage } from './modify-map-point.page';

describe('ModifyMapPointPage', () => {
  let component: ModifyMapPointPage;
  let fixture: ComponentFixture<ModifyMapPointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyMapPointPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyMapPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
