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
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "warnmap",
    loadChildren: () =>
      import("./pages/warnmap/warnmap.module").then((m) => m.WarnmapPageModule),
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/logins/login/login.module').then(m => m.LoginPageModule)
  },

  // 免责条款
  {
    path: 'clause-state',
    loadChildren: () => import('./pages/logins/clause-state/clause-state.module').then(m => m.ClauseStatePageModule)
  },

  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'userinfo',
    loadChildren: () => import('./pages/userinfo/userinfo.module').then(m => m.UserinfoPageModule)
  },
  {
    path: 'resetpwd',
    loadChildren: () => import('./users/resetpwd/resetpwd.module').then(m => m.ResetpwdPageModule)
  },
  {
    path: 'userdetail',
    loadChildren: () => import('./pages/userdetail/userdetail.module').then(m => m.UserdetailPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/appversion/appversion.module').then(m => m.AppversionPageModule)
  },
  //  风险预警
  {
    path: 'riskwarn',
    loadChildren: () => import('./pages/riskwarn/riskwarn.module').then(m => m.RiskwarnPageModule)
  },
  // 群成员
  {
    path: 'chatmembers',
    loadChildren: () => import('./safes/companys/chatmembers/chatmembers.module').then( m => m.ChatmembersPageModule)
  },
  // 意见反馈
  {
    path: 'feedbacklist',
    loadChildren: () => import('./users/feedbacklist/feedbacklist.module').then( m => m.FeedbacklistPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'darkmode',
    loadChildren: () => import('./pages/darkmode/darkmode.module').then( m => m.DarkmodePageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then(m => m.QrcodePageModule)
  },
  {
    path: 'join-group',
    loadChildren: () => import('./pages/join-group/join-group.module').then(m => m.JoinGroupPageModule)
  },
  {
    path: 'group-qrcode',
    loadChildren: () => import('./pages/group-qrcode/group-qrcode.module').then(m => m.GroupQrcodePageModule)
  },
  {
    path: 'login-confirm',
    loadChildren: () => import('./pages/login-confirm/login-confirm.module').then( m => m.LoginConfirmPageModule)
  },
  {
    path: 'safeshoptype',
    loadChildren: () => import('./pages/safeshoptype/safeshoptype.module').then( m => m.SafeshoptypePageModule)
  },
  {
    path: 'emergen-plan',
    loadChildren: () => import('./pages/emergen-plan/emergen-plan.module').then( m => m.EmergenPlanPageModule)
  },
  {
    path: 'event-report',
    loadChildren: () => import('./pages/event-report/event-report.module').then(m => m.EventReportPageModule)
  },
  {
    path: 'countryinfor',
    loadChildren: () => import('./pages/countryinfor/countryinfor.module').then(m => m.CountryinforPageModule)
  },
  {
    path: 'countrydetail',
    loadChildren: () => import('./pages/countrydetail/countrydetail.module').then(m => m.CountrydetailPageModule)
  },
  {
    path: 'account-select',
    loadChildren: () => import('./pages/account-select/account-select.module').then(m => m.AccountSelectPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
