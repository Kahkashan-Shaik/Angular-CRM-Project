import { Component, OnInit } from '@angular/core';
import { ImageModalPopUp } from './imagemodalpopup.component';

@Component({
  selector: 'app-footer',
  template: `<div class="wrapper h-10">
            <footer class="main-footer">
              <strong>Copyright &copy; 2022 <a href="#">DJ THE BLAX</a>.</strong>
              All rights reserved.
            </footer>
          </div>`,
  styles: [``]
})
export class FooterComponent extends ImageModalPopUp implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
