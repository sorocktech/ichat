import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SitesharePage } from './siteshare.page';

describe('SitesharePage', () => {
  let component: SitesharePage;
  let fixture: ComponentFixture<SitesharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesharePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SitesharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
