import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app.component';  
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';  
import { of } from 'rxjs';  

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;  
  let authService: AuthService;  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, 
        HttpClientTestingModule, 
        RouterModule.forRoot([]) 
      ],
      providers: [
        AuthService,  
        {
          provide: ActivatedRoute,  
          useValue: {
            paramMap: of({ get: (key: string) => '123' })
          }
        },
        {
          provide: Router,  
          useValue: {
            navigate: jasmine.createSpy('navigate')  
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'angular-application-bancaire' title`, () => {
    expect(component.title).toEqual('angular-application-bancaire');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-application-bancaire');
  });

  it('should inject AuthService', () => {
    expect(authService).toBeTruthy();
  });
});

