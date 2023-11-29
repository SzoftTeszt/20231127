import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-images-details',
  templateUrl: './images-details.component.html',
  styleUrls: ['./images-details.component.css']
})
export class ImagesDetailsComponent implements OnChanges{

@Input() kepek:any 
aktIndex=0
latszikIndex=0
latszikTomb:any=[]

ngOnChanges(changes: SimpleChanges): void {
    
  // console.log("Változas", changes)
  // console.log("Képek",this.kepek)
  if (this.kepek){
    this.latszikTomb=this.kepek.slice(this.latszikIndex, this.latszikIndex+3)
    // this.latszikTomb.push(this.kepek[0])
    // this.latszikTomb.push(this.kepek[1])
    // this.latszikTomb.push(this.kepek[2])
  }
}

constructor( ){
  console.log("Képek:",this.kepek)

 
}

jobbraLep(){
  this.latszikIndex++
  this.latszikTomb=this.kepek.slice(this.latszikIndex, this.latszikIndex+3)
}
balraLep(){
  this.latszikIndex--
  this.latszikTomb=this.kepek.slice(this.latszikIndex, this.latszikIndex+3)
}
}
