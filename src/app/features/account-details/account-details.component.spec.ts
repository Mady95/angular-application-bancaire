import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AccountDetailsComponent } from './account-details.component';
import { of } from 'rxjs'; // ✅ Importer of() pour simuler les observables
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDetailsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute, 
          useValue: {
            paramMap: of({ get: (key: string) => '123' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
