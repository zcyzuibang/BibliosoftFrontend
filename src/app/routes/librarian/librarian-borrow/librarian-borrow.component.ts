import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {User} from "../../../utils/DataStructs/User";
import {MetaBook} from "../../../utils/DataStructs/MetaBook";
import {Book} from "../../../utils/DataStructs/Book";
import {Message, MessageService} from "../../../utils/message.service";
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-librarian-borrow',
  templateUrl: './librarian-borrow.component.html',
  styleUrls: ['./librarian-borrow.component.css']
})
export class LibrarianBorrowComponent implements OnInit {

  readerId: string;
  cacheReaderId: string;

  barcode: string;
  cacheBarcode: string;

  reader: User;
  book: Book;
  metaBook: MetaBook;

  constructor(
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only('librarian');
  }

  search_reader() {
    if (this.readerId === this.cacheReaderId) {
      return;
    }
    this.cacheReaderId = this.readerId;
    this.apiService.get_account('reader', this.readerId)
      .then(res => {
        if (res.length === 0 || res[0].username !== this.readerId) {
          // not found
          console.error('not that user');
        } else {
          this.reader = res[0];
        }
      }).catch(err => {
        console.error(err);
      });
  }

  search_book() {
    if (this.cacheBarcode === this.barcode) {
      return;
    }
    this.cacheBarcode = this.barcode;
    this.apiService.get_book(this.barcode)
      .then(res => {
        this.book = res;
        // console.log(res);
        this.apiService.get_meta_book(res.isbn)
          .then(res => {
            this.metaBook = res;
          }).catch(err => {
            // todo: do sth
          });
      }).catch(err => {
        // todo: do sth
      });
  }

  borrow() {
    this.apiService.borrow(this.readerId, this.barcode)
      .then(res => {
        if (res) {
          this.messageService.messages.push(new Message('borrow success!', 'success'));
        } else {
          this.messageService.messages.push(new Message(
            'borrow fail! May be this book is be borrowed by other. check book status: ' +
              'http://bibliosoft.ciaran.cn/book-detail/' + this.book.isbn,
            'danger'));
        }
      }).catch(err => {
        console.error(err);
      });
  }
}
