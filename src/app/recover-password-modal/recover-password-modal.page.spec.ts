import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverPasswordModalPage } from './recover-password-modal.page';

describe('RecoverPasswordModalPage', () => {
  let component: RecoverPasswordModalPage;
  let fixture: ComponentFixture<RecoverPasswordModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecoverPasswordModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
