import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsTransactionComponent } from './details-transaction.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AccountService } from '../core/services/accounts.service';
import { TransactionService } from '../services/transaction.service';
import { ToastService } from '../core/services/toast.service';
import { TransactionSyncService } from '../services/transaction-sync.service';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('DetailsTransactionComponent', () => {
  let component: DetailsTransactionComponent;
  let fixture: ComponentFixture<DetailsTransactionComponent>;
  let mockAccountService: any;
  let mockTransactionService: any;
  let mockToastService: any;
  let mockTransactionSyncService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockAccountService = {
      getAccountById: jasmine.createSpy('getAccountById').and.returnValue(of({ id: '1', name: 'Test Account' }))
    };
    
    mockTransactionService = {
      getTransactionById: jasmine.createSpy('getTransactionById').and.returnValue(of({
        id: '123',
        amount: 100,
        status: 'completed',
        emitter: { id: '1', name: 'Emitter Account' },
        receiver: { id: '2', name: 'Receiver Account' },
        emittedAt: '2025-03-28T12:00:00Z',
        description: 'Test Transaction'
      })),
      cancelTransaction: jasmine.createSpy('cancelTransaction').and.returnValue(of({})),
      createTransaction: jasmine.createSpy('createTransaction').and.returnValue(of({ id: '456' }))
    };
    
    mockToastService = {
      show: jasmine.createSpy('show')
    };
    
    mockTransactionSyncService = {
      updateTransaction: jasmine.createSpy('updateTransaction')
    };
    
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    
    mockActivatedRoute = {
      snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('123') } }
    };

    await TestBed.configureTestingModule({
      imports: [DetailsTransactionComponent],
      providers: [
        DatePipe,
        { provide: AccountService, useValue: mockAccountService },
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: ToastService, useValue: mockToastService },
        { provide: TransactionSyncService, useValue: mockTransactionSyncService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load transaction on init', () => {
    expect(mockTransactionService.getTransactionById).toHaveBeenCalledWith('123');
    expect(component.transaction.id).toBe('123');
  });

  it('should format amount correctly for debit transaction', () => {
    component.selectedAccount = { id: '1' } as any;
    component.transaction = { emitter: { id: '1' }, amount: 100 } as any;
    expect(component.getFormattedAmount()).toEqual({ sign: '-', class: 'text-danger' });
  });

  it('should format amount correctly for credit transaction', () => {
    component.selectedAccount = { id: '1' } as any;
    component.transaction = { emitter: { id: '2' }, amount: 100 } as any;
    expect(component.getFormattedAmount()).toEqual({ sign: '+', class: 'text-success' });
  });

  it('should cancel transaction and show toast', () => {
    component.transaction = { id: '123' } as any;
    component.cancelTransaction();
    expect(mockTransactionService.cancelTransaction).toHaveBeenCalledWith('123');
    expect(mockToastService.show).toHaveBeenCalledWith('❌ Transaction annulée avec succès.', 'success');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should retry transaction and navigate', () => {
    component.transaction = {
      emitter: { id: '1' },
      receiver: { id: '2' },
      amount: 100,
      description: 'Test'
    } as any;
    component.retryTransaction();
    expect(mockTransactionService.createTransaction).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details-transaction', '456']);
  });

  it('should copy transaction id and show toast', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    await component.copy('123'); 
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('123');
    expect(mockToastService.show).toHaveBeenCalledWith('📋 Id transaction copié !', 'info'); 
  });
  

  it('should return empty string if fullName is null or undefined', () => {
    expect(component.getInitials(null as unknown as string)).toBe(''); 
    expect(component.getInitials(undefined as unknown as string)).toBe('');
    expect(component.getInitials('')).toBe('');
  });
});
