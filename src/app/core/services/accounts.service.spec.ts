import { TestBed } from '@angular/core/testing';
import { AccountService } from './accounts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('AccountsService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});