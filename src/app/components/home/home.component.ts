import { logging } from 'protractor';
import { NewsService } from './../../services/news.service';
import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/models/new';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  news: New[] = [];
  displayedColumns: string[] = ['id', 'title', 'detail'];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getNews().subscribe((news) => {
      this.news = news;
      console.log(this.news);
    });
  }

  
}
