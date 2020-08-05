import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {

  comment_id;

  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;

  republic = JSON.parse(localStorage.getItem('republica'));

  comments = [];

  constructor( 
    public formbuilder: FormBuilder,
    public commentService: CommentService ) { 
    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
  }

  ngOnInit() {
    console.log(this.republic.id);

    this.showComments(this.republic.id);

  }

  sendEditComment(form){
    console.log(form);
    console.log(form.value);
    this.commentService.updateComment(this.comment_id,form.value).subscribe(
      (res) => { 
        console.log(res);
        this.comments = res.comments;
        this.showComments(this.republic.id);
      }, (err) => { console.log(err);}
    )
  }

  deleteComment(id){
    this.commentService.deleteComment(id).subscribe(
      (res) => { 
        console.log(res);
        this.comments = res.comments;
        this.showComments(this.republic.id);
      }, (err) => { console.log(err);}
    )
    console.log('Mais que cancelado: ' + id);
  }

  showComments(id){
    this.commentService.showRepublicWithComments(id).subscribe(
      (res) => { 
        console.log(res);
        this.comments = res.comments;
      }, (err) => { console.log(err);}
    )
  }

  sendComment(form){
    console.log(form);
    console.log(form.value);
    form.value.username = localStorage.getItem('username');
    form.value.republic_id = this.republic.id;
    this.editMode = false;
    this.commentService.createComment(form.value).subscribe(
      (res) => { 
        console.log(res);
        this.showComments(this.republic.id);
      }, (err) => { console.log(err);}
    )
  }

  toggleEdit(id){
    this.editMode = true;
    this.comment_id = id;
    console.log(this.comment_id);
  }

}
