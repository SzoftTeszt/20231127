import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  kepek:any
  constructor(private base:BaseService){
    this.base.getFileData().snapshotChanges().pipe(
      map(ch=> ch.map(c=>({key:c.key, ...c.payload.val() })) )
    ).subscribe(
      (f)=>this.kepek=f
    )
  }
  torles(kep:any){
    this.base.deleteFile(kep)
  }
}
