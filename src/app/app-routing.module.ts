import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>import("./pages/home/home.module").then((m) => m.HomePageModule),
      pathMatch: 'full',
      canActivate: [AuthGuard], 
  },
  {
    path: "contacts",
    loadChildren: () =>import("./pages/linkmanlist/linkmanlist.module").then((m) => m.LinkmanlistPageModule),
      canActivate: [AuthGuard], 
      pathMatch: 'full'
  },
  {
    path: "home",
    loadChildren: () =>import("./pages/home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "send-message",
    loadChildren: () =>import("./pages/send-message/send-message.module").then((m) => m.SendMessagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "chat/:id",
    loadChildren: () => import("./pages/chat-message/chat-message.module").then((m) => m.ChatMessagePageModule),
    canActivate: [AuthGuard]
  },

  {
    path: "contact/:id",
    loadChildren: () =>import("./pages/linkmancard/linkmancard.module").then((m) => m.LinkmancardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./pages/add-contact/add-contact.module').then( m => m.AddContactPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'note',
    loadChildren: () => import('./pages/note/note.module').then( m => m.NotePageModule)
  },
  {
    path: 'create-note',
    loadChildren: () => import('./pages/create-note/create-note.module').then( m => m.CreateNotePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
