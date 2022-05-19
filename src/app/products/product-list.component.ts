import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
    selector:'product-list',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css'],
    providers: [ProductService]
})

export class ProductListComponent implements OnInit, OnDestroy{
   
    constructor(private productService:ProductService){
        

    }

    pageTitle:string = 'Product List';
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean= false;
    errorMessage:string= '';
    sub!: Subscription;
    
    /* listFilter:string= ''; */
    private _listFilter:string= '';

    get listFilter():string{
        return this._listFilter;
    }

    set listFilter(value:string){
        this._listFilter=value;
        this.filteredProducts = this.performFilter(value)
    }
    
   
    
     products:IProduct[]=[];

     

     toggleImage():void{
         this.showImage= !this.showImage;
     }
     ngOnInit(): void {
         this.sub= this.productService.getProducts().subscribe({
             next:products=> {
                 this.products= products
                this.filteredProducts= this.products; 
                },
             error:err => this.errorMessage=err,
             
         });
        /* this.product= this.productService.getProducts()*/
        
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }

 

    filteredProducts: IProduct[]=this.products;

    performFilter(filterBy: string):IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct)=> product.productName.toLowerCase().includes(filterBy))
    }
    onRatingClicked(message:string):void{
        this.pageTitle= message
    }
}