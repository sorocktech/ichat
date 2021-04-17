import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
      pathMatch: 'full'
  },
  {
    path: "contacts",
    loadChildren: () =>
      import("./pages/linkmanlist/linkmanlist.module").then((m) => m.LinkmanlistPageModule),
      pathMatch: 'full'
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "send-message",
    loadChildren: () =>
      import("./pages/send-message/send-message.module").then((m) => m.SendMessagePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/logins/login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
