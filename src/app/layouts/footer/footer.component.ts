import { Component, OnInit } from '@angular/core';

/**
 * FooterComponent component to render footer
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
