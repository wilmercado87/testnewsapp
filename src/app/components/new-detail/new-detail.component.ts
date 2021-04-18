import { NewsService } from './../../services/news.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { New } from 'src/app/models/new';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.scss'],
})
export class NewDetailComponent implements OnInit {
  new: New;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.getNew(id);
  }

  getNew(id: string): void {
    this.newsService.getNews().subscribe(news => {
      this.new = news.filter(obj => obj.id == id)[0];
      console.log(this.new);
    });
  }
}
