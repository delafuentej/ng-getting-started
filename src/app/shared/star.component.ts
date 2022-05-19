import { Component, OnChanges, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector:'star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
})

export class StarComponent implements OnChanges{
    /* rating:number=2.5; */
    cropWidth:number=75;
    @Input() rating:number=0;
    @Output() ratingClicked:EventEmitter<string> = new EventEmitter<string>();


   /*  @Output() notify: EventEmitter<string>= new EventEmitter<string>() */
    ngOnChanges(): void {
        this.cropWidth= this.rating * this.cropWidth/5;
    }

    onClick():void{
        this.ratingClicked.emit(`The rating is: ${this.rating}`) 
    }

}