import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PageNotFoundComponent {}
