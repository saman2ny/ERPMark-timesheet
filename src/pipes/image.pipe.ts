import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){
  }
  transform(value) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
