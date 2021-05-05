import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
      pathMatch: 'full',
      canActivate: [AuthGuard], // 添加针对当前路由的 canActivate 路由守卫
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
    path: "chat-message",
    loadChildren: () =>
      import("./pages/chat-message/chat-message.module").then((m) => m.ChatMessagePageModule),
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./pages/linkmancard/linkmancard.module").then((m) => m.LinkmancardPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
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
