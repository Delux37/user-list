import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/ui/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((o) => o.UsersModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
];
