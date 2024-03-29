/// <reference path="typings/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var Article = (function () {
    function Article(title, link, type) {
        this.title = title;
        this.link = link;
        this.votes = 0;
        this.type = type;
    }
    Article.prototype.voteUp = function () {
        this.votes += 1;
        return false;
    };
    Article.prototype.voteDown = function () {
        this.votes -= 1;
        return false;
    };
    Article.prototype.domain = function () {
        var link = this.link.split('//')[1] || 'no domain/';
        return link.split('/')[0];
    };
    return Article;
})();
var RedditArticle = (function () {
    function RedditArticle() {
    }
    RedditArticle = __decorate([
        angular2_1.Component({
            selector: 'reddit-article',
            properties: ['article']
        }),
        angular2_1.View({
            template: "\n  <article>\n    <div class=\"votes\">{{ article.votes }}</div>\n    <div class=\"main\">\n      <span>{{ article.type }}</span>\n      <h2>\n        <a href=\"{{ article.link }}\">{{ article.title }}</a>\n        <span>({{ article.domain() }})</span>\n      </h2>\n      <ul>\n        <li><a href (click)='article.voteUp()'>upvote</a></li>\n        <li><a href (click)='article.voteDown()'>downvote</a></li>\n      </ul>\n    </div>\n  </article>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], RedditArticle);
    return RedditArticle;
})();
var RedditApp = (function () {
    function RedditApp() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 'technical'),
            new Article('Fullstack', 'http://fullstack.io', 'technical')
        ];
        this.newType = 'technical';
    }
    RedditApp.prototype.addArticle = function (title, link, type) {
        this.articles.push(new Article(title.value, link.value, type));
        title.value = '';
        link.value = '';
        type = 'entertainment';
    };
    RedditApp = __decorate([
        angular2_1.Component({
            selector: 'reddit'
        }),
        angular2_1.View({
            template: "\n  <section class=\"new-link\">\n    <div class=\"control-group\">\n      <div><label for=\"title\">Title: </label></div>\n      <div><input name=\"title\" #newtitle></div>\n    </div>\n    <div class=\"control-group\">\n      <div><label for=\"link\">Link: </label></div>\n      <div><input name=\"link\" #newlink></div>\n    </div>\n    </div>\n    <div class=\"control-group\">\n      <select [(ng-model)]=\"newType\">\n        <option value=\"technical\">Technical</option>\n        <option value=\"entertainment\">Entertainment</option>\n      </select>\n    </div>\n\n    <button (click)=\"addArticle(newtitle, newlink, newType)\">Submit Button</button>\n  </section>\n\n  <reddit-article\n    *ng-for=\"#article of articles\"\n    [article]=\"article\">\n  </reddit-article>\n  ",
            directives: [RedditArticle, angular2_1.NgFor, angular2_1.formDirectives]
        }), 
        __metadata('design:paramtypes', [])
    ], RedditApp);
    return RedditApp;
})();
angular2_1.bootstrap(RedditApp);
