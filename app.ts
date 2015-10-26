/// <reference path="typings/angular2/angular2.d.ts" />

import {
  Component,
  NgFor,
  View,
  formDirectives,
  bootstrap,
} from "angular2/angular2";


class Article {
  title: string;
  link: string;
  votes: number;
  type: string;

  constructor(title, link, type){
    this.title = title;
    this.link = link;
    this.votes = 0;
    this.type = type;
  }
  voteUp() {
    this.votes += 1;
    return false;
  }

  voteDown() {
    this.votes -= 1;
    return false;
  }

  domain(){
    var link = this.link.split('//')[1] || 'no domain/';
    return link.split('/')[0];
  }
}

@Component({
  selector: 'reddit-article',
  properties: ['article']
})

@View({
  template: `
  <article>
    <div class="votes">{{ article.votes }}</div>
    <div class="main">
      <span>{{ article.type }}</span>
      <h2>
        <a href="{{ article.link }}">{{ article.title }}</a>
        <span>({{ article.domain() }})</span>
      </h2>
      <ul>
        <li><a href (click)='article.voteUp()'>upvote</a></li>
        <li><a href (click)='article.voteDown()'>downvote</a></li>
      </ul>
    </div>
  </article>
  `
})
class RedditArticle{
  article: Article;
}

@Component({
  selector: 'reddit'
})

@View({
  template: `
  <section class="new-link">
    <div class="control-group">
      <div><label for="title">Title: </label></div>
      <div><input name="title" #newtitle></div>
    </div>
    <div class="control-group">
      <div><label for="link">Link: </label></div>
      <div><input name="link" #newlink></div>
    </div>
    </div>
    <div class="control-group">
      <select [(ng-model)]="newType">
        <option value="technical">Technical</option>
        <option value="entertainment">Entertainment</option>
      </select>
    </div>

    <button (click)="addArticle(newtitle, newlink, newType)">Submit Button</button>
  </section>

  <reddit-article
    *ng-for="#article of articles"
    [article]="article">
  </reddit-article>
  `,
  directives: [RedditArticle, NgFor, formDirectives]
})

class RedditApp {
  articles: Array<Article>;
  newType: string;

  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 'technical'),
      new Article('Fullstack', 'http://fullstack.io', 'technical')
    ];
    this.newType = 'technical';

  }

  addArticle(title, link, type){
    this.articles.push(new Article(title.value, link.value, type));
    title.value = '';
    link.value = '';
    type = 'entertainment';
  }
}

bootstrap(RedditApp);
