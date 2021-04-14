import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicOpinionPage } from './public-opinion.page';

describe('PublicOpinionPage', () => {
  let component: PublicOpinionPage;
  let fixture: ComponentFixture<PublicOpinionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOpinionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicOpinionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
