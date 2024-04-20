import { UpdatePasswordModule } from './ui/compoments/update-password/update-password.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/compoments/dashboard/dashboard.component';
import { HomeComponent } from './ui/compoments/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
    {path:"",component:DashboardComponent},
        {path:"customers",loadChildren:()=> import("./admin/compoments/customer/customer.module").then(module=>
        module.CustomerModule),canActivate:[AuthGuard]},
        {path:"products",loadChildren:()=> import("./admin/compoments/products/products.module").then(module=>
        module.ProductsModule),canActivate:[AuthGuard]},
       {path:"orders",loadChildren:()=> import("./admin/compoments/order/order.module").then(module=>
        module.OrderModule),canActivate:[AuthGuard]},
        {path:"authorize-menu",loadChildren:()=> import("./admin/compoments/authorize-menu/authorize-menu.module").
        then(module=>module.AuthorizeMenuModule),canActivate:[AuthGuard]},
        {path:"roles",loadChildren:()=> import("./admin/compoments/role/role.module").
        then(module=>module.RoleModule),canActivate:[AuthGuard]},
        {path:"users",loadChildren:()=> import("./admin/compoments/user/user.module").
        then(module=>module.UserModule),canActivate:[AuthGuard]}
    ],canActivate:[AuthGuard]
},
  {path:"",component:HomeComponent},
  {path:"basket",loadChildren:()=>import("./ui/compoments/baskets/baskets.module").then(module=>
    module.BasketsModule)},
    {path:"products",loadChildren:()=>import("./ui/compoments/products/products.module").then(module=>
      module.ProductsModule)},
      {path:"products/:pageNo",loadChildren:()=>import("./ui/compoments/products/products.module").then(module=>
        module.ProductsModule)},
      {path:"register",loadChildren:()=>import("./ui/compoments/register/register.module").then(module=>
        module.RegisterModule)},
        {path:"login",loadChildren:()=>import("./ui/compoments/login/login.module").then(module=>
          module.LoginModule)},
          {path:"password-reset",loadChildren:()=>import("./ui/compoments/password-reset/password-reset.module").then(module=>
            module.PasswordResetModule)},
            {path:"update-password/userId/:resetToken",loadChildren:()=>import("./ui/compoments/update-password/update-password.module").then(module=>
              module.UpdatePasswordModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
