import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TodoComponent } from './pages/todo/todo.component';

const routes: Routes = [
  //App Routes
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'notes',
        component: TodoComponent
      }
    ]
  },

  //Auth Routes
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
