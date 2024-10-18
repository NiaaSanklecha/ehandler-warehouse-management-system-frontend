import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-digit',
  templateUrl: './animated-digit.component.html',
  styleUrls: ['./animated-digit.component.css']
})
export class AnimatedDigitComponent {

  @Input() item: number = 0;
  @Input() picked: number = 0;
  @Input() packed: number = 0;
  @Input() shipped: number = 0;

  itemCount: number = 0;
  pickedCount : number = 0;
  packedCount : number = 0;
  shippedCount : number = 0;

  itemCountStop:any = setInterval(()=>{
    this.itemCount++;
    if(this.itemCount == this.item){
      clearInterval(this.itemCountStop);
      clearInterval(this.shippedCountStop);
      clearInterval(this.packedCountStop);
      clearInterval(this.pickedCountStop);
    }
  },100)

  pickedCountStop:any = setInterval(()=>{
    
    this.pickedCount++;
    if(this.pickedCount == this.picked){
      clearInterval(this.shippedCountStop);
      clearInterval(this.packedCountStop);
      clearInterval(this.pickedCountStop);
      clearInterval(this.itemCountStop);
    }
  },100)
  packedCountStop:any = setInterval(()=>{
    
    this.packedCount++;
    if(this.packedCount == this.packed){
      clearInterval(this.shippedCountStop);
      clearInterval(this.packedCountStop);
      clearInterval(this.pickedCountStop);
      clearInterval(this.itemCountStop);
    }
  },100)

  shippedCountStop:any = setInterval(()=>{
    
    this.shippedCount++;
    if(this.shippedCount == this.shipped){
      clearInterval(this.shippedCountStop);
      clearInterval(this.packedCountStop);
      clearInterval(this.pickedCountStop);
      clearInterval(this.itemCountStop);
    }
  },100)
  

}
