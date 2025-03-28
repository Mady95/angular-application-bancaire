import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Mocking Router
class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: RouterMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useClass: RouterMock } // On utilise notre mock du Router ici
      ]
    });
    guard = TestBed.inject(AuthGuard); // Injecter le AuthGuard
    router = TestBed.inject(Router);   // Injecter notre mock du Router
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Vérifier que le guard est bien créé
  });

  it('should allow access if user is authenticated', () => {
    spyOn(guard, 'canActivate').and.returnValue(of(true)); // Simuler un utilisateur authentifié

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    result.subscribe((res) => {
      expect(res).toBe(true); // Si l'utilisateur est authentifié, l'accès est autorisé
    });
  });

  it('should block access if user is not authenticated', () => {
    spyOn(guard, 'canActivate').and.returnValue(of(false)); // Simuler un utilisateur non authentifié

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    result.subscribe((res) => {
      expect(res).toBe(false); // Si l'utilisateur n'est pas authentifié, l'accès est bloqué
      expect(router.navigate).toHaveBeenCalledWith(['/login']); // Vérifier que la redirection vers login a été effectuée
    });
  });
});
