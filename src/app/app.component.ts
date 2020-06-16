import { Component, Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (public dialog: MatDialog){}
  title = 'listapp';
  count = 0;
  listArr =[{
    id:this.count++,
    title:'Title',
    items:[],
    currentItem:''
  }];

  onAddList():void{
    var newList = {
      id:this.count++,
      title:'New List',
      items:[],
      currentItem:''
    };
    this.listArr.push(newList);
  }

  onDelList(i):void{
    this.listArr.splice(i,1);
  }

  onDelItem(i,j):void{
    this.listArr[i].items.splice(j,1);
  }

  onAdd(arr):void{
    if(arr.currentItem != ''){
      this.listArr.forEach(list => {
        if(list.id == arr.id){
          list.items.push(arr.currentItem);
          arr.currentItem = '';
        }
      });
    }    
  }

  onAddKey(event, arr):void{
    var key = event.which || event.keyCode;
    if(key == 13){
      this.onAdd(arr);
    }
  }

  drop(event: CdkDragDrop<string[]>, i) {
    moveItemInArray(this.listArr[i].items, event.previousIndex, event.currentIndex);
  }

  openDialog(i,j): void {
    const dialogRef = this.dialog.open(ItemDialog, {
      width: '250px',
      data: {item: this.listArr[i].items[j]}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listArr[i].items[j] = result;
    });
  }

  openTitleDialog(i):void{
    const dialogRef = this.dialog.open(ItemDialog, {
      width: '250px',
      data: {item: this.listArr[i].title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listArr[i].title = result;
    });
  }

}

@Component({
  selector: 'item-dialog',
  templateUrl: './app.itemdialog.html',
})
export class ItemDialog {
  constructor(
    public dialogRef: MatDialogRef<ItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

}