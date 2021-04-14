/**
 * 拦截器 收集
 * barrel
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../sevices/app.intercept';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];