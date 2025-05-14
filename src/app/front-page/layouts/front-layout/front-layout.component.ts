import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderFrontComponent } from '../../components/header-front/header-front.component';
import { FooterFrontComponent } from '../../components/footer-front/footer-front.component';

@Component({
  selector: 'app-front-layout',
  imports: [RouterOutlet,HeaderFrontComponent,FooterFrontComponent],
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.css'
})
export class FrontLayoutComponent {

}
