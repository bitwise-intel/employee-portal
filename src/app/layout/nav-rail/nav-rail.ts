import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppUser } from '../../core/models/user.model';
import { NavItemComponent, NavItem } from './components/nav-item/nav-item';
import { UserBadge } from './components/user-badge/user-badge';

@Component({
  selector: 'app-nav-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavItemComponent, UserBadge],
  templateUrl: './nav-rail.html',
  styleUrl: './nav-rail.scss',
})
export class NavRail {
  readonly collapsed = input<boolean>(false);
  readonly user = input<AppUser | null>(null);
  readonly toggleCollapse = output<void>();
  readonly logout = output<void>();

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home', icon: '⌂' },
  ];
}
