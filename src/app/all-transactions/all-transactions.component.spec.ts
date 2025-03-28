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

  it('should load accounts and transactions on init', () => {
    fixture.detectChanges(); // Rendre le composant
    expect(mockAccountService.getAccounts).toHaveBeenCalled();
    expect(mockTransactionService.getAllTransactions).toHaveBeenCalled();
    expect(component.accounts.length).toBe(2);
    expect(component.transactions.length).toBe(2);
  });
  

  it('should display the correct number of transactions', () => {
    fixture.detectChanges(); // S'assurer que le composant est rendu
    const transactionElements = fixture.debugElement.queryAll(By.css('.transaction-item'));
    expect(transactionElements.length).toBe(2);
  });

  it('should display canceled transactions with the correct style', () => {
  component.transactions = [
    {
      id: '2',
      amount: 50,
      status: 'canceled',
      emitter: { id: '2', fullName: 'Receiver Account' },
      receiver: { id: '1', fullName: 'Emitter Account' },
      emittedAt: '2025-03-27T10:00:00Z',
      description: 'Test Transaction 2'
    }
  ];
  fixture.detectChanges(); // Met à jour le DOM

  const canceledTransaction = fixture.debugElement.query(By.css('.transaction-item'));
  const amountElement = canceledTransaction.query(By.css('.transaction-amount')).nativeElement;

  expect(amountElement.classList).toContain('text-danger');
  expect(amountElement.classList).toContain('text-decoration-line-through');
});
  

  it('should display canceled transactions with the correct style', () => {
    const canceledTransaction = fixture.debugElement.query(By.css('.transaction-item:nth-child(2)'));
    const amountElement = canceledTransaction.query(By.css('.transaction-amount')).nativeElement;

    expect(amountElement.classList).toContain('text-danger');
    expect(amountElement.classList).toContain('text-decoration-line-through');
  });

  it('should call show toast with error message if transaction creation fails', () => {
    mockTransactionService.getAllTransactions.and.returnValue(of([
      {
        id: '1',
        amount: 100,
        status: 'completed',
        emitter: { id: '1', fullName: 'Emitter Account' },
        receiver: { id: '2', fullName: 'Receiver Account' },
        emittedAt: '2025-03-28T12:00:00Z',
        description: 'Test Transaction 1'
      }
    ]));

    component.loadTransactions('1', 1);
    expect(mockToastService.show).toHaveBeenCalledWith('❌ Erreur lors de la réalisation de la transaction', 'error');
  });

  it('should display initials correctly for emitter and receiver', () => {
    const firstTransaction = fixture.debugElement.query(By.css('.transaction-item:first-child'));
    const emitterInitials = firstTransaction.query(By.css('.transaction-emitter-initials')).nativeElement;
    const receiverInitials = firstTransaction.query(By.css('.transaction-receiver-initials')).nativeElement;

    expect(emitterInitials.textContent.trim()).toBe('EA'); // Initiales de "Emitter Account"
    expect(receiverInitials.textContent.trim()).toBe('RA'); // Initiales de "Receiver Account"
  });

  it('should return empty string if fullName is null or undefined in getInitials', () => {
    expect(component.getInitials(null as unknown as string)).toBe('');
    expect(component.getInitials(undefined as unknown as string)).toBe('');
    expect(component.getInitials('')).toBe('');
  });
});
