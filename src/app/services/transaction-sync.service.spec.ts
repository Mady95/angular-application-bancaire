import { TestBed } from '@angular/core/testing';

import { TransactionSyncService } from './transaction-sync.service';

describe('TransactionSyncService', () => {
  let service: TransactionSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
