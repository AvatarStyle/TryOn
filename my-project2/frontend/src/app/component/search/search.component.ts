import { Component } from '@angular/core';
import { Item } from "../items/item.model";
import { ItemService } from "../../item.service";
import { HttpClient } from "@angular/common/http";
import {ClosetService} from "../../service/closet.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
    private http: HttpClient,
    private closetService: ClosetService
  ) {}

  performSearch(query: string) {
    this.localResults = [];
    this.apiResults = [];

    // 태그 검색(MongoDB)
    this.itemService.searchByTag(query).subscribe((result: any) => {
      console.log(result);
      this.localResults = Array.isArray(result.data) ? result.data : [result.data];
    });


    // Naver 검색
    this.itemService.naverSearch(query).subscribe((naverResults: any) => {
      console.log(naverResults); // 로그에 결과 출력 (또는 다른 처리)
      // 원하는 형태로 데이터 변환 후 apiResults에 추가 또는 별도의 변수에 저장
      const transformedNaverItems = naverResults.items
        .filter(item => item.category1 === '패션의류')
        .map(item => ({
        ...item,
        image: item.image,
        title: item.title.replace(/<b>|<\/b>/g, ''),
        lprice: item.lprice,
        link: item.link,
        category1: item.category1,
        productId: item.productId.toString(),
        mallname:item.mallname
      }));

      Array.prototype.push.apply(this.apiResults, transformedNaverItems);
    });
  }

  addToCloset(item){
    const username = localStorage.getItem('username');
    if(username){
      this.closetService.addToCloset(username, item.id)
        .subscribe(
          response=> console.log(response),
          error => console.error(error)
        );
    }
  }


  toggleSearch(): void {
    this.localResults = []; // 로컬 결과 초기화
    this.apiResults = []; // API 결과 초기화
  }
}
