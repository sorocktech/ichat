import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndustrylistPage } from './industrylist.page';

describe('IndustrylistPage', () => {
  let component: IndustrylistPage;
  let fixture: ComponentFixture<IndustrylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrylistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndustrylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
