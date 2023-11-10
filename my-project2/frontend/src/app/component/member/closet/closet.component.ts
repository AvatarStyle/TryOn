import {Component, OnInit, ViewChild} from '@angular/core';
import {ClosetService} from "../../../service/closet.service";
import {forkJoin} from "rxjs";
import {ProductService} from "../../../service/product.service";
import {ClosetResponse} from "src/app/component/member/closet/closet-response.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.css']
})
export class ClosetComponent implements OnInit{

  closetItems = [];
  posts = [];
  currentIndices = [];

  constructor(private closetService: ClosetService,
              private productService: ProductService,
              private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
    this.loadClosetItems();
    const username = localStorage.getItem('username');
    this.http.get(`https://tryon-399311.du.r.appspot.com/posts/${username}`)
      .subscribe((data: any[]) => {
        this.posts = data;
        for (let i = 0; i < data.length; i++) {
          this.currentIndices[i] = 0;
        }
      });
  }

  removeItem(itemId: string) {
    this.closetService.removeFromCloset(itemId).subscribe(
      () => {
        // 성공적으로 제거된 후 옷장 아이템 리스트 갱신
        alert('상품이 삭제 되었습니다.');
        this.loadClosetItems();
      },
      error => console.error(error)
    );
  }

  loadClosetItems() {
    const username = localStorage.getItem('username');
    if(username){
      this.closetService.getCloset(username).subscribe(
        response => {
          const requests = response.productIds.map(productId =>
            this.productService.getProduct(productId) // getProduct 메서드가 /api/products/{id} API를 호출한다고 가정합니다.
          );

          forkJoin(requests).subscribe(
            products => this.closetItems = products,
            error => console.error(error)
          );
        },
        error => console.error(error)
      );
    }
  }


  previous(postIndex: number) {
    if (this.currentIndices[postIndex] > 0) {
      this.currentIndices[postIndex]--;
    }
  }

  next(postIndex: number, postImageLength: number) {
    if (this.currentIndices[postIndex] < postImageLength - 1) {
      this.currentIndices[postIndex]++;
    }
  }

  deletePost(id: string) {
    if (confirm('게시물을 삭제하시겠습니까??')) {
      this.http.delete(`https://tryon-399311.du.r.appspot.com/posts/${id}`, {responseType: 'text'})
        .subscribe(
          () => {
            location.reload();
            alert('게시물이 삭제 되었습니다.');
            // 게시물 삭제 후 목록 새로고침
            const username = localStorage.getItem('username');
            this.http.get(`https://tryon-399311.du.r.appspot.com/posts/${username}`)
              .subscribe((data: any[]) => {
                this.posts = data;
                for (let i = 0; i < data.length; i++) {
                  this.currentIndices[i] = -1;
                }
              });
          },
          error => console.error(error)
        );
    }
  }

  updateFormOpened = false;
  selectedPost = null;

  openUpdateForm(post) {
    if (this.updateFormOpened && this.selectedPost && this.selectedPost.id === post.id) {
      this.updateFormOpened = false;
      this.selectedPost = null;
    } else {
      this.updateFormOpened = true;
      this.selectedPost = { ...post };
    }
  }

  updatePost(id: string) {
    this.http.put(`https://tryon-399311.du.r.appspot.com/posts/update/${id}`, this.selectedPost, {responseType: 'text'})
      .subscribe(response => {
        console.log(response);
        this.updateFormOpened = false;
        location.reload();
        alert('게시물이 수정 되었습니다.');
        const username = localStorage.getItem('username');
        this.http.get(`https://tryon-399311.du.r.appspot.com/posts/${username}`)
          .subscribe((data: any[]) => {
            this.posts = data;
            for (let i = 0; i < data.length; i++) {
              this.currentIndices[i] = -1;
            }
          });
      });
  }

  goToPost(postId){
    this.router.navigate(['/post', postId])
  }
}
