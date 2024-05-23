import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  
  constructor(
    private renderer: Renderer2
    ) {

    }
  ngAfterViewInit() {
    const loader = this.renderer.selectRootElement('#loader');
    loader.style.display = 'none';
  }
}
