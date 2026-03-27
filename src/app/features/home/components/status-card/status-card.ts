import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-card.html',
  styleUrl: './status-card.scss',
})
export class StatusCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly accent = input<boolean>(false);
}
