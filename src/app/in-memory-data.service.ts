// src/app/in-memory-data.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, username: 'testuser', password: '123456' },
      { id: 2, username: 'admin', password: 'admin123' }
    ];
    return { users };
  }
}
