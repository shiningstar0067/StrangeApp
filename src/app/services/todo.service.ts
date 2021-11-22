import { Injectable } from '@angular/core';
import { TodoList } from '../models/cls-todo';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl: string = "https://jsonplaceholder.typicode.com";
  todoEndpoint: string = "/todos";

  constructor(private client: HttpClient) { }

  getTodoList(){
    return this.client.get<TodoList>(this.baseUrl + this.todoEndpoint);    
  }
}
