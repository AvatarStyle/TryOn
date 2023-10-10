import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../service/post.service';
import axios from "axios";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: any;
  commentText: string = '';
  commentList = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('query');

    this.postService.getPost(postId).subscribe(
      data => {
        this.post = data;
        this.getComments();
      },
      error => {
        console.error('Error:', error);
      }
    );

    setInterval(() => {
      this.getComments();
    }, 5000);
  }

  toggleLike() {
    const currentUsername = localStorage.getItem('username');
    if (this.post && this.post.likes.includes(currentUsername)) {
      // 이미 좋아요한 경우
      const index = this.post.likes.indexOf(currentUsername);
      if (index > -1) {
        this.post.likes.splice(index, 1); // 좋아요 취소
      }
    } else{
      // 아직 좋아요하지 않은 경우
      this.post.likes.push(currentUsername); // 좋아요 추가
    }
    // 변경된 좋아요 상태를 서버에 업데이트
    axios.post(`https://tryon-399311.du.r.appspot.com/posts/${this.post.id}/like`, { username: currentUsername })
      .then(response => {
        console.log("좋아요 상태 업데이트 성공");
      })
      .catch(error => {
        console.error("좋아요 상태 업데이트 실패:", error);
      });
  }

  likeButtonImage(): string {
    const currentUsername = localStorage.getItem('username');
    if (this.post && this.post.likes.includes(currentUsername)) {
      return 'assets/icons/like.png'; // 이미 좋아요한 경우
    } else {
      return 'assets/icons/nolike.png'; // 좋아요하지 않은 경우
    }
  }

  submitComment() {
    if (this.commentText) {
      const commentData = {
        content : this.commentText,
        username : localStorage.getItem('username')
      };
      axios.post(`https://tryon-399311.du.r.appspot.com/posts/${this.post.id}/comments`, commentData)
        .then(response => {
          console.log("댓글 전송 성공");
          this.commentText = '';
          // 댓글 목록 다시 가져오기
          this.getComments();
        })
        .catch(error => {
          console.error("댓글 전송 실패:", error);
        });
    }
  }

  getComments() {
    axios.get(`https://tryon-399311.du.r.appspot.com/posts/${this.post.id}/comments`)
      .then(response => {
        const comments:any[]=[];
        for(let i=0; i<response.data.length;i++){
          comments.push({
            username : response.data[i].username,
            content : response.data[i].content,
          });
        }
        console.log("댓글 목록:", comments);
        this.commentList=comments;
      })
      .catch(error => {
        console.error("댓글 목록 가져오기 실패:", error);
      });
  }

}
