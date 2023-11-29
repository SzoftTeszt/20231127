import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dbRef:AngularFireList<any>;

  constructor(private storage:AngularFireStorage, private db: AngularFireDatabase) {
    this.dbRef=this.db.list('/feltolt/')
   }

  getFileData(){
    return this.dbRef
  }

  deleteFile(file:any){
    this.dbRef.remove(file.key).then(
      ()=>{
      const filename= '/feltolt/'+file.name
      const storegeRef=this.storage.ref(filename)
      storegeRef.delete().subscribe()
    }
    )
  }

  uploadFile(file:any){
    const filename= '/feltolt/'+file.name
    console.log(filename)
    const storegeRef=this.storage.ref(filename) 

    //  storegeRef.getDownloadURL().subscribe(
    //   {
    //     next:(a)=>{console.log("OK:",a)},
    //     error:(a)=>{console.log("Errror:",a)}
    //   }
    // )
    const updateTask=this.storage.upload(filename, file)
    
    updateTask.snapshotChanges()
    .subscribe({
      next:(ref:any)=>{
        console.log(ref)
            
      },
      error:(err:any)=> console.log(err),
      complete:()=>{
        storegeRef.getDownloadURL().subscribe(
          (url)=>{
            this.saveFileData({name:file.name, url:url})
            console.log(file.name, url)
          })  
      }
    }
    )
    return updateTask.percentageChanges()
  }

  saveFileData(fileData:any){
      

      
      this.db.list('/feltolt/').push(fileData)
  }

}
