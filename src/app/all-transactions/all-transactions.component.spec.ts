import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllTransactionsComponent } from './all-transactions.component';
import { of } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { AccountService } from '../core/services/accounts.service';
import { ToastService } from '../core/services/toast.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AllTransactionsComponent', () => {
  let component: AllTransactionsComponent;
  let fixture: ComponentFixture<AllTransactionsComponent>;
  let mockTransactionService: any;
  let mockAccountService: any;
  let mockToastService: any;
  let mockRouter: any;

  beforeEach(async () => {
    // Mocks
    mockAccountService = {
      getAccounts: jasmine.createSpy('getAccounts').and.returnValue(of([
        { id: '1', fullName: 'Test Account' },
        { id: '2', fullName: 'Another Account' }
      ])),
      getTransactionsByAccountId: jasmine.createSpy('getTransactionsByAccountId').and.returnValue(of([
        {
          id: '1',
          amount: 100,
          status: 'completed',
          emitter: { id: '1', fullName: 'Emitter Account' },
          receiver: { id: '2', fullName: 'Receiver Account' },
          emittedAt: '2025-03-28T12:00:00Z',
          description: 'Test Transaction 1'
        },
        {
          id: '2',
          amount: 50,
          status: 'canceled',
          emitter: { id: '2', fullName: 'Receiver Account' },
          receiver: { id: '1', fullName: 'Emitter Account' },
          emittedAt: '2025-03-27T10:00:00Z',
          description: 'Test Transaction 2'
        }
      ]))
    };
    

    mockAccountService = {
      getAccounts: jasmine.createSpy('getAccounts').and.returnValue(of([
        { id: '1', fullName: 'Test Account' },
        { id: '2', fullName: 'Another Account' }
      ]))
    };

    mockToastService = {
      show: jasmine.createSpy('show')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [AllTransactionsComponent],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: AccountService, useValue: mockAccountService },
        { provide: ToastService, useValue: mockToastService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty string if fullName is null or undefined in getInitials', () => {
    expect(component.getInitials(null as unknown as string)).toBe('');
    expect(component.getInitials(undefined as unknown as string)).toBe('');
    expect(component.getInitials('')).toBe('');
  });
});
