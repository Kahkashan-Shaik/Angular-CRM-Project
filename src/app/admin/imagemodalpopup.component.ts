import { Component, OnInit, ViewChild} from "@angular/core";
import { environment } from "src/environments/environment";
@Component({
    selector: 'app-imagemodalpopup',
    template: ``,
    styles: [``]
})
export class ImageModalPopUp  {
    
    defaultImagePath =  environment.DefaultImagePath+'default.png';
    ImagePath = environment.UplaodedImageUrl;
    constructor(){}
    imageModalOpen1(imagename: any){
        this.defaultImagePath = this.ImagePath+imagename;
        console.log(this.defaultImagePath);
    }
    @ViewChild('closebutton') closebutton;
    public close(){
        this.closebutton.nativeElement.click();
    }
}