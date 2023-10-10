import { Component } from '@angular/core';
import { Item } from "../items/item.model";
import { ItemService } from "../../item.service";
import { HttpClient } from "@angular/common/http";
import {ClosetService} from "../../service/closet.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  isSearchVisible: boolean = true;
  localResults: Item[] = [];
  apiResults: any[] = [];
  searchInput: string;
  currentSearchInput: string;

  categories = ['', '아우터', '반팔', '니트'];
  selectedCategory: string;

  constructor(
    private itemService: ItemService,
    private http: HttpClient,
    private closetService: ClosetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      const query = params['query'];
      this.performSearch(query);
    })
  }

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

    this.currentSearchInput = query;
  }

  addToCloset(item){
    const username = localStorage.getItem('username');
    if(username){
      this.closetService.addToCloset(username, item.id)
        .subscribe(
          response=> {
            console.log(response);
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  addToClosetAPI(item) {
    const convertedItem = this.convertToClosetItem(item);

    const itemId = this.generateItemId();

    convertedItem.id = itemId;

    const url = 'https://tryon-399311.du.r.appspot.com/closet/add';

    // Products 테이블에 저장할 상품 정보
    const productPayload = {
      brand: convertedItem.brand,
      buyUrl: convertedItem.buyUrl,
      category: convertedItem.category,
      id: convertedItem.id,
      imageUrl: convertedItem.imageUrl,
      name: convertedItem.name,
      price: convertedItem.price,
      tags: convertedItem.tags
    };

    // Products 테이블에 POST 요청 보내기
    this.http.post('https://tryon-399311.du.r.appspot.com/api/products/', productPayload)
      .subscribe(
        response => {
          alert('상품이 옷장에 추가 되었습니다.');
          console.log('상품 정보 저장 성공');
        },
        error => {
          console.error('상품 정보 저장 실패');
        }
      );

    // 옷장에 상품 ID 추가하기
    const requestPayload = {
      username: localStorage.getItem('username'),
      productId: itemId
    };

    return this.http.post(url, requestPayload)
      .subscribe(
        response => {
          console.log('옷장 추가 성공');
        },
        error => {
          console.error('옷장 추가 실패');
        }
      );
  }


  convertToClosetItem(item): any {
    return {
      name: item.title,
      category: item.category3,
      brand: item.brand,
      price: parseInt(item.lprice),
      imageUrl: item.image,
      buyUrl: item.link,
      tags: [],
    };
  }

  generateItemId(){
    return Date.now().toString();
  }

  toggleSearch(): void {
    this.localResults = []; // 로컬 결과 초기화
    this.apiResults = []; // API 결과 초기화
  }
}
