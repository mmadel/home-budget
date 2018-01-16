import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { Config } from "app/app.config";

if (environment.production) {
  enableProdMode();
}

Config.loadInstance('assets/config.json')
.then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule);
});
