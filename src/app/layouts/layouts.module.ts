import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent, FooterComponent, MainComponent } from '.';

@NgModule({
  declarations: [AppLayoutComponent, FooterComponent, MainComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutsModule {}
