import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from '../chat/chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';

import {
  DropdownMenusModule,
  ChatInnerModule,
  CardsModule,
} from '../../../_metronic/partials';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from 'src/app/pages/routing';


const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'private-chat',
        component: PrivateChatComponent,
      },
      { path: '', redirectTo: 'private-chat', pathMatch: 'full' },
      { path: '**', redirectTo: 'private-chat', pathMatch: 'full' },
    ],
  },
];



@NgModule({
  declarations: [
    ChatComponent,
    PrivateChatComponent,
    
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ChatRoutingModule,
    DropdownMenusModule,
    ChatInnerModule,
    CardsModule,
    InlineSVGModule,
    
  ],
  

  exports: [RouterModule],
})
export class ChatModule {}
