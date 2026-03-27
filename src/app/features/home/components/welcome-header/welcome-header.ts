import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AppUser } from '../../../../core/models/user.model';

@Component({
  selector: 'app-welcome-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome-header.html',
  styleUrl: './welcome-header.scss',
})
export class WelcomeHeader {
  readonly user = input<AppUser | null>(null);

  readonly greeting = computed(() => {
    const firstName = this.user()?.firstName ?? 'there';
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    return `Good ${timeOfDay}, ${firstName}.`;
  });
}
