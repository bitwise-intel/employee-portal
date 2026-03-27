import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { NavRail } from '../nav-rail/nav-rail';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavRail],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  readonly auth = inject(AuthService);
  readonly navCollapsed = signal(false);
}
