import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@src/app/app.module';
import { environment } from '@src/environments/environment';

if (environment.production) {
  enableProdMode();
  // clear all console log for production
  if (window) {
    window.console.log = function() {};
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
