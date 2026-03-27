import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AppUser } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './user-badge.html',
  styleUrl: './user-badge.scss',
})
export class UserBadge {
  readonly user = input<AppUser | null>(null);
  readonly collapsed = input<boolean>(false);
  readonly logout = output<void>();
}
