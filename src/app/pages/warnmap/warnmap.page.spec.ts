import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarnmapPage } from './warnmap.page';

describe('WarnmapPage', () => {
  let component: WarnmapPage;
  let fixture: ComponentFixture<WarnmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarnmapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarnmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
