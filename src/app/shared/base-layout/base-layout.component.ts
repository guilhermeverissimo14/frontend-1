import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent extends OnDestroyMixin implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
  }

  get authenticatedUser() {
    return this.authService.authenticatedUser;
  }

  get currentUserRole() {
    return this.authService.authenticatedUser.tipoUsuario;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
