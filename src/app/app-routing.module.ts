import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'chat', 
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
