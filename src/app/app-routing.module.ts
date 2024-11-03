import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'presentation', pathMatch: 'full' },
  { path: 'presentation', loadChildren: () => import('./presentation/presentation.module').then(m => m.PresentationPageModule) },
  { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule) },
  { path: 'geolocation', loadChildren: () => import('./geolocation/geolocation.module').then(m => m.GeolocationPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
