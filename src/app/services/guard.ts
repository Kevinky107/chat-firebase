import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): any {
        console.log('Comprobando login')
        if (!this.authService.loged) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}