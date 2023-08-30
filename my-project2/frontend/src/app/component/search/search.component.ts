import { Component } from '@angular/core';
import { Item } from "../items/item.model";
import { ItemService } from "../../item.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  isSearchVisible: boolean = true;
  localResults: Item[] = [];
  apiResults: any[] = [];
  searchInput: string;

  categories = ['', '아우터', '반팔', '니트'];
  selectedCategory: string;

  constructor(
    private itemService: ItemService,
    private http: HttpClient
  ) {}

  performSearch(query: string) {
    // 태그 검색(MongoDB)
    this.itemService.searchByTag(query).subscribe((result:any)=>{
      console.log(result);
      this.localResults = Array.isArray(result.data) ? result.data : [result.data];
    });
    /*this.itemService.searchByTag(query).subscribe((localResults:Item[]) => {
      this.localResults = localResults;
    });

    this.localResults = this.itemService.searchItems(query)
      .filter(item => !this.selectedCategory || item.category === this.selectedCategory);*/

    // API 검색
    this.itemService.apiSearch(query).subscribe((apiResults:any[]) => {
      this.apiResults = apiResults;
    });
  }

  toggleSearch(): void {
    this.localResults = []; // 로컬 결과 초기화
    this.apiResults = []; // API 결과 초기화
  }
}
