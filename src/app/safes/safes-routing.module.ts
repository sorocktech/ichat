import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafesPage } from './safes.page';

const routes: Routes = [
  {
    path: '',
    component: SafesPage,
  },

  // 自救指南
  {
    path: 'selfhelp-guide',
    loadChildren: () => import('../pages/selfhelp-guide/selfhelp-guide.module').then(m => m.SelfhelpGuidePageModule)
  },
  // 汇率兑换
  {
    path: 'rate-exchange',
    loadChildren: () => import('../pages/rate-exchange/rate-exchange.module').then(m => m.RateExchangePageModule)
  },
  {
    path: 'public-opinion',
    loadChildren: () => import('../pages/public-opinion/public-opinion.module').then(m => m.PublicOpinionPageModule)
  },
  {
    path: 'security-weekly',
    loadChildren: () => import('../pages/security-weekly/security-weekly.module').then(m => m.SecurityWeeklyPageModule)
  },
  {
    path: 'epidemic-detect',
    loadChildren: () => import('../pages/epidemic-detect/epidemic-detect.module').then(m => m.EpidemicDetectPageModule)
  },
  {
    path: 'siteshare',
    loadChildren: () => import('./companys/siteshare/siteshare.module').then( m => m.SitesharePageModule)
  },
  {
    path: 'comwechat',
    loadChildren: () => import('./companys/comwechat/comwechat.module').then( m => m.ComwechatPageModule)
  },
  //信息统计
  {
    path: 'infoStatistics',
    loadChildren: () => import('./infoStatistics/list/list.module').then( m => m.ListPageModule)
  },
  //信息统计新增
  {
    path: 'infoStatistics/report',
    loadChildren: () => import('./infoStatistics/report/report.module').then( m => m.ReportPageModule)
  },
  //意见反馈
  {
    path: 'feedback',
    loadChildren: () => import('./companys/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  // 防控日报
  {
    path: 'preventlog',
    loadChildren: () => import('./preventlog/preventlog.module').then( m => m.PreventlogPageModule)
  },
  {
    path: 'modify-map-point',
    loadChildren: () => import('./infoStatistics/modify-map-point/modify-map-point.module').then( m => m.ModifyMapPointPageModule)
  },
  {
    path: 'msg-count-investment',
    loadChildren: () => import('./infoStatistics/msg-count-investment/msg-count-investment.module').then( m => m.MsgCountInvestmentPageModule)
  },
  {
    path: 'msg-count-institutional',
    loadChildren: () => import('./infoStatistics/msg-count-institutional/msg-count-institutional.module').then( m => m.MsgCountInstitutionalPageModule)
  },
  {
    path: 'arealist',
    loadChildren: () => import('./infoStatistics/arealist/arealist.module').then( m => m.ArealistPageModule)
  },
  {
    path: 'industrylist',
    loadChildren: () => import('./infoStatistics/industrylist/industrylist.module').then( m => m.IndustrylistPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafesPageRoutingModule {}
