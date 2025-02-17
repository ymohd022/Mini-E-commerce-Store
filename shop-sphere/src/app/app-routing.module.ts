import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { FAQComponent } from './faq/faq.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { ReturnsExchangesComponent } from './returns-exchanges/returns-exchanges.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { CartComponent } from './cart/cart.component';
import { MyordersComponent } from './myorders/myorders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsOfServiceComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'shipping', component: ShippingInfoComponent },
  { path: 'returns', component: ReturnsExchangesComponent },
  { path: 'track-order', component: TrackOrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: MyordersComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }