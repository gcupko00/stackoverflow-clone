import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { Ng2BootstrapModule, TooltipModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { QuestionComponent } from './question/question.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { TagsComponent } from './tags/tags.component';
import { MaxLengthPipe } from './max-length.pipe';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'user', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'ask-question', component: QuestionFormComponent},
  { path: 'tags', component: TagsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    MenuPanelComponent,
    NavBarComponent,
    UserComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    PageNotFoundComponent,
    QuestionComponent,
    AboutComponent,
    FaqComponent,
    QuestionFormComponent,
    TagsComponent,
    MaxLengthPipe,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    Ng2BootstrapModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    DropdownModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
