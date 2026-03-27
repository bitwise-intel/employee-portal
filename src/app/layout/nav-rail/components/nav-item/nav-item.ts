import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.scss',
})
export class NavItemComponent {
  readonly item = input.required<NavItem>();
  readonly collapsed = input<boolean>(false);
}
