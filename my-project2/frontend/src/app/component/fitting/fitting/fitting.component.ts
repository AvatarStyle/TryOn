import { Component } from '@angular/core';

@Component({
  selector: 'app-fitting',
  templateUrl: './fitting.component.html',
  styleUrls: ['./fitting.component.css']
})
export class FittingComponent {

  imagePath: string = '/assets/avatar_woman.png';

  handleManImage(){
    /*if (this.imageElement && this.imageElement.nativeElement) {
      this.imageElement.nativeElement.remove();
    }*/
    this.imagePath = '/assets/avatar_man.png'
  }

  openImageInput() {
    const imageInput = document.getElementById('image-input') as HTMLInputElement;
    imageInput.click();
  }

  handleImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const previewImage = document.getElementById('preview-image') as HTMLImageElement;
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImage.src = e.target.result as string;
        previewImage.style.display = 'block';
      }
      reader.readAsDataURL(file);
    } else {
      previewImage.src = '';
      previewImage.style.display = 'none';
    }
  }

}