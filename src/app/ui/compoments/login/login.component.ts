import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AutService } from 'src/app/services/common/aut.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { TokenResponse } from 'src/app/contracts/token/tokenresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  constructor(private useService:UserService,spinner:NgxSpinnerService,private authService:AutService,
    private activatedRoute:ActivatedRoute,private router:Router, private socialAuthService:SocialAuthService){
      socialAuthService.authState.subscribe((async (user:SocialUSer)=>{
        console.log(user)
        this.showSpinner(SpinnerType.BollAtom);
         switch(user.provider){
            case "GOOGLE":
              await   useService.googleLogin(user,()=>{
                this.authService.IdentityCheck();
                    this.hiddenSpinner(SpinnerType.BollAtom);
                })
                break;
                case "FACEBOOK":
                  await   useService.facebookLogin(user,()=>{
                    this.authService.IdentityCheck();
                    this.hiddenSpinner(SpinnerType.BollAtom);
                    })
                    break;
                   }});


  }
async login(usernameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.BollAtom);
   await this.useService.login(usernameOrEmail,password,()=>{
    this.authService.IdentityCheck();
    this.activatedRoute.queryParams.subscribe(params=>{
      const returnUrl:string=params["returnUrl"];
      if(returnUrl)
      this.router.navigate([returnUrl]);
    });
    this.hiddenSpinner(SpinnerType.BollAtom);

  });
}
facebookLogin(){
  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
}

}
