import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionComponent } from './transaction.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AccountService } from '../core/services/accounts.service';
import { ToastService } from '../core/services/toast.service';
import { TransactionService } from '../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let mockTransactionService: any;
  let mockToastService: any;
  let mockAccountService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Mocking services
    mockTransactionService = {
      createTransaction: jasmine.createSpy('createTransaction').and.returnValue(of({ id: '123' }))
    };
    mockToastService = {
      show: jasmine.createSpy('show')
    };
    mockAccountService = {
      getAccountById: jasmine.createSpy('getAccountById').and.returnValue(of({ id: '1', balance: 500 })),
      getAccounts: jasmine.createSpy('getAccounts').and.returnValue(of([{ id: '2', balance: 1000 }]))
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    mockActivatedRoute = {
      paramMap: of({
        get: jasmine.createSpy('get').and.returnValue('1') // assuming '1' is the emitter account id
      })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, TransactionComponent],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: ToastService, useValue: mockToastService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load account details on init', () => {
    component.ngOnInit();
    expect(mockAccountService.getAccountById).toHaveBeenCalledWith('1');
    expect(component.accountBalance).toBe(500);
  });

  it('should load accounts on init', () => {
    component.ngOnInit();
    expect(mockAccountService.getAccounts).toHaveBeenCalled();
    expect(component.accounts.length).toBeGreaterThan(0);
  });

  it('should check if the amount exceeds balance', () => {
    component.amount = 600;
    component.checkAmount();
    expect(component.amountExceedsBalance).toBeTrue();
  });

  it('should submit transaction successfully if amount does not exceed balance', () => {
    component.amount = 100;
    component.receiverAccountId = '2';
    component.description = 'Payment for services';

    component.onSubmit();

    expect(mockTransactionService.createTransaction).toHaveBeenCalledWith({
      emitterAccountId: '1',
      receiverAccountId: '2',
      amount: 100,
      description: 'Payment for services'
    });
    expect(mockToastService.show).toHaveBeenCalledWith('✅ Transaction réalisée avec succès', 'success');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details-transaction', '123']);
  });

  it('should show error toast if transaction creation fails', () => {
    // Simuler une erreur lors de la création de la transaction
    mockTransactionService.createTransaction.and.returnValue(throwError('Error'));
  
    // Paramétrage de la transaction pour le test
    component.amount = 100;
    component.receiverAccountId = '2';
    component.description = 'Payment for services';
  
    // Soumettre la transaction
    component.onSubmit();
  
    // Vérification que le toast d'erreur a bien été montré
    expect(mockToastService.show).toHaveBeenCalledWith('❌ Erreur lors de la réalisation de la transaction', 'error');
  });
  

  it('should navigate to home when goToHome is called', () => {
    component.goToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
