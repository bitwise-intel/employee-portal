import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit, AfterViewInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

  readonly googleBtn = viewChild<ElementRef<HTMLDivElement>>('googleBtn');
  readonly year = signal(new Date().getFullYear());
  readonly binaryCols = ['01001010', '11010010', '00101101', '10110100', '01101001', '10010011'];

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit(): void {
    const el = this.googleBtn()?.nativeElement;
    if (!el) return;

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response) =>
        this.ngZone.run(() => this.auth.handleCredentialResponse(response)),
    });

    google.accounts.id.renderButton(el, {
      type: 'standard',
      theme: 'filled_black',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    });
  }
}
