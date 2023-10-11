import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";
import {ClosetService} from "../../service/closet.service";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit{

  currentIndices = [];
  posts = [];
  closetItems = [];

  constructor(private router: Router,
              private http: HttpClient,
              private closetService: ClosetService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.http.get(`https://tryon-399311.du.r.appspot.com/posts/all`)
      .subscribe((data: any[]) => {
        this.posts = data;
        for (let i = 0; i < data.length; i++) {
          this.currentIndices[i] = 0;
        }
      });
  }

  navigateToPost(): void {
    this.router.navigate(['/post']);
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

  goToPost(postId){
    this.router.navigate(['/post', postId])
  }
}
