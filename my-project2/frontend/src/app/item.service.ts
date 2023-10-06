import { Injectable } from '@angular/core';
import { Item } from '../app/component/items/item.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private backendUrl = 'http://localhost:8080/api'; // 백엔드 API 엔드포인트 URL
  private readonly clientId = 'pyKxHNJQD2r5QL18dwff';
  private readonly clientSecret = 'Is26TZ2Tes';

  private items: Item[];

  constructor(private http: HttpClient) {}

  /*getItems(){
    return this.http.get<Item[]>(this.backendUrl);
  }

  createItems(){
    return this.http.get<Item[]>(this.backendUrl);
  }*/

  /*기존 코드 - 하드 코딩 방식
  private items: Item[] = [
    new Item(1, '남성 나슬란 와트로 다운 패딩 재킷' ,'스톤아일랜드', '아우터', 790000,  '../../../assets/items/1.jpg',
      'https://www.musinsa.com/app/goods/3261311?loc=goods_rank', ['패딩', '검정색','검정', '재킷', '자켓', '남자','스톤아일랜드']),
    new Item(2, 'TAG KP TEE - BLACK' ,'브라운브레스', '반팔', 36000,  '../../../assets/items/2.jpg',
      'https://www.musinsa.com/app/goods/2376229', ['반팔', '검정색','검정','반팔티', '반팔', '남자','브라운브레스']),
    new Item(3, 'Texture Henly neck Knit (Black)' ,'솔티', '니트', 84000, '../../../assets/items/3.jpg',
      'https://www.musinsa.com/app/goods/2005081', ['니트','검정색 니트', '검정색', '니트', '상의', '남자', '솔티']),
    new Item(4, '1996 에코 눕시 다운 자켓 NJ1DP53S_BLK' ,'THE NORTH FACE', '아우터', 288000, '../../../assets/items/4.jpg',
      'https://www.musinsa.com/app/goods/3261311?loc=goods_rank', ['패딩', '검정색', '재킷', '자켓', '남자', '노스페이스', '더노스페이스'])
  ];*/

  naverSearch(query: string): Observable<any> {
    const headers = {
      'X-Naver-Client-Id': this.clientId,
      'X-Naver-Client-Secret': this.clientSecret
    };
    return this.http.get(`${this.backendUrl}/naverSearch?query=${query}`);
  }

  searchByTag(tag: string){
    return this.http.get<Item[]>(`${this.backendUrl}/products/search?tag=${tag}`);
  }
}
