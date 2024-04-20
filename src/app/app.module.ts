import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './admin/layout/components/header/header.component';
import { LayoutComponent,} from './admin/layout/layout.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import {JwtModule} from '@auth0/angular-jwt'
import { LoginComponent } from './ui/compoments/login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorServiceService } from './services/common/http-error-handler-interceptor-service.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';






@NgModule({
    declarations: [
        AppComponent,
       LoginComponent,
       DynamicLoadComponentDirective
    ],

    providers: [
      { provide: "baseUrl", useValue: "https://localhost:7014/api" }
      {
        provide: "SocialAuthServiceConfig",
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider("902986185803-4dl068flq4g27bpj299khhlq7es3g988.apps.googleusercontent.com")
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider:new FacebookLoginProvider("5466318467785")
            }
          ],
          onError: err => console.log(err)
        } as SocialAuthServiceConfig
      },
      {
        provide:HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptorServiceService, multi: true
      }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        UiModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        JwtModule.forRoot({
          config:{
            tokenGetter:()=>localStorage.getItem("accessToken"),
            allowedDomains:["localhost:7014"]
          }
        }),
        SocialLoginModule
    ]
})
export class AppModule { }

