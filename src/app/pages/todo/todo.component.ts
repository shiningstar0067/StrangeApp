import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TodoList } from 'src/app/models/cls-todo';
import { TodoService } from 'src/app/services/todo.service';
import { MatPaginator } from "@angular/material/paginator";
import { HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatTable) table: MatTable<any>;

  public todoList: TodoList[] = [];
  public displayedColumns: string[] = ['select', 'notes'];
  public dataSource: MatTableDataSource<TodoList>;
  public showAddNotes: boolean = false;
  public newNotes: string = "";
  public selection = new SelectionModel<TodoList>(true, []);
  
  private userID: number = 1;
  selectedOption: any;

  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.todoList;
    this.displayedColumns = ["notes", "actions"];

    this.service.getTodoList().subscribe((response: any) => {
      if (response.length > 0) {
        response.forEach((data: any) => {
          if (data.userId == this.userID) {
            var item: TodoList = {
              id: data.id,
              userID: data.userId,
              notes: data.title,
              completed: data.completed,
              editable: true
            };
            this.todoList.push(item);
          }
        });
        this.dataSource.data = this.todoList;
      }
    }, (error: HttpErrorResponse) => {
      this.todoList = [
        {
          id: 1, notes: "test hsga ajfas sdds", userID: 1, completed: true, editable: true
        },
        {
          id: 2, notes: "sjahsjf fj;asjfa jh", userID: 1, completed: false, editable: true
        }
      ];
      this.dataSource.data = this.todoList;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleNotesAdd() {
    this.showAddNotes = !this.showAddNotes;
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // selectionChanged(option: any) {
  //   this.selectedOption = option;
  // }
  

  addNotes() {
    if (this.newNotes != "") {
      let maxID = this.todoList.reduce((prev, current) => (+prev.id > +current.id) ? prev : current).id;

      var item: TodoList = {
        id: maxID+1,
        userID: this.userID,
        notes: this.newNotes,
        completed: false,
        editable: true
      };
      this.todoList.push(item);

      this.dataSource.data = this.todoList;
    }
  }

  updateNotes(item: any){
    const index = this.todoList.indexOf(item, 0);
    this.todoList[index].editable = !(this.todoList[index].editable);
    this.dataSource.data = this.todoList;
  }

  deleteNotes(item: any){
    const index = this.todoList.indexOf(item, 0);
    this.todoList.splice(index,1);

    this.dataSource.data = this.todoList;
  }

  completeNotes(item: any){
    const index = this.todoList.indexOf(item, 0);
    this.todoList[index].completed = !(this.todoList[index].completed);

    this.dataSource.data = this.todoList;
  }
}
