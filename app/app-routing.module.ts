import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@src/app/app.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
