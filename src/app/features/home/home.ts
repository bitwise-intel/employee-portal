import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { WelcomeHeader } from './components/welcome-header/welcome-header';
import { StatusCard } from './components/status-card/status-card';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WelcomeHeader, StatusCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly auth = inject(AuthService);
}
