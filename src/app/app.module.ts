import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MessageService } from './utils/message.service';

import { HomeComponent } from './routes/common/home/home.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { SearchBookComponent } from './routes/common/search-book/search-book.component';
import { BookDetailComponent } from './routes/common/book-detail/book-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './routes/admin/admin-home/admin-home.component';
import { LogoutComponent } from './routes/common/logout/logout.component';
import { AboutComponent } from './routes/common/about/about.component';
import { LoginComponent } from './routes/common/login/login.component';
import { PostComponent } from './components/post/post.component';
import { LibrarianBorrowComponent } from './routes/librarian/librarian-borrow/librarian-borrow.component';
import { ReaderViewPaymentComponent } from './routes/reader/reader-view-payment/reader-view-payment.component';
import { ReaderFineComponent } from './routes/reader/reader-fine/reader-fine.component';
import { ManageUserComponent } from './routes/common/manage-user/manage-user.component';
import { LibrarianReturnComponent } from "./routes/librarian/librarian-return/librarian-return.component";
import { ReaderBorrowingComponent } from './routes/reader/reader-borrowing/reader-borrowing.component';
import { ReaderProfileComponent } from './routes/reader/reader-profile/reader-profile.component';
import { AdminChangePasswordComponent } from './routes/admin/admin-change-password/admin-change-password.component';
import { LibrarianViewFineComponent } from './routes/librarian/librarian-view-fine/librarian-view-fine.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {StateService} from "./utils/state.service";
import { LibrarianHomeComponent } from './routes/librarian/librarian-home/librarian-home.component';
import {
  ErrorStateMatcher,
  MatChipsModule,
  MatGridListModule, MatInputModule,
  MatListModule, MatPaginatorModule, MatSortModule,
  MatTableModule,
  MatToolbarModule, ShowOnDirtyErrorStateMatcher
} from "@angular/material";
import { LibrarianProfileComponent } from './routes/librarian/librarian-profile/librarian-profile.component';

@NgModule({
  declarations: [
    // component
    MessagesComponent,
    NavbarComponent,
    PostComponent,
    // pages
    AppComponent,
    // - home pages
    HomeComponent,
    AdminHomeComponent,
    LibrarianHomeComponent,
    // - common pages
    LogoutComponent,
    AboutComponent,
    LoginComponent,
    SearchBookComponent,
    BookDetailComponent,
    ManageUserComponent,
    // - admin pages
    AdminLoginComponent,
    AdminChangePasswordComponent,
    // - librarian pages
    LibrarianAddBookComponent,
    LibrarianBorrowComponent,
    LibrarianReturnComponent,
    LibrarianViewFineComponent,
    LibrarianProfileComponent,
    // - reader pages
    ReaderViewPaymentComponent,
    ReaderFineComponent,
    ReaderBorrowingComponent,
    ReaderProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // ng-bootstrap Module
    NgbModule,
    // Material Module
    BrowserAnimationsModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatInputModule
  ],
  providers: [
    MessageService, StateService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  bootstrap: [AppComponent]
})
export class AppModule { }
