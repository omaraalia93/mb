import {
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { UiService } from '@app-core/index';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() classes = [];

  constructor(private renderer: Renderer2, private uiService: UiService) {}

  get divClasses(): string {
    return [...this.classes].join(' ');
  }

  ngOnInit(): void {
  }

}