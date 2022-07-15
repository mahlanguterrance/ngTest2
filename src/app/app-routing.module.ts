import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { MainComponent } from './directives/main/main.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, children: [
      { path: 'register', component: RegisterComponent },
      { path: 'users', component: UsersComponent },
      { path: 'resources', component: ResourcesComponent },
    ]
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//{path: '', pathMatch: 'full', redirectTo: 'login' },
  //{ path: 'login', component: LoginComponent },