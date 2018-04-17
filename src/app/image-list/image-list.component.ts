import { Component, OnInit} from '@angular/core';
import { ImageService } from '../shared/image.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
  animations: [
    trigger('StaggerAnim', [

      transition('* => *', [

        query('button', style({ opacity: 0 })),

        query('button', stagger('80ms', [
          animate('1s linear', keyframes([
            style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35%)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
          ]))
        ])),

        query('button', [
          animate(1000, style('*'))
        ])

      ])
    ])
  ]
})
export class ImageListComponent implements OnInit {
  images: any[];
  imagesFound = false;
  searchQuery = '';
  searching = false;

  handleSuccess(data) {
    this.imagesFound = true;
    this.images = data.hits;
    console.log(data.hits);
  }

  handleError(error) {
    console.log(error);
  }

  constructor(private _imageService: ImageService) { }


  searchImages(SearchQuery: string) {
    this.searching = true;
    return this._imageService.getImage(SearchQuery).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  ngOnInit() {
  }

}
