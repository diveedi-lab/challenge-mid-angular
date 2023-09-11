import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../api/services/api.service';
import {PagedPersonsDto, PersonDto} from '../../../../api/models/person';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate'];

  persons: PersonDto[] = [];
  totalItems: number;
  pageSize: number;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService.getPersons(this.paginator.pageIndex).pipe(catchError(() => of(null)));
        }),
        map(res => {
          this.isLoadingResults = false;

          if (res === null) {
            return [];
          }

          this.totalItems = res.totalItems;
          this.pageSize = res.data.length;

          return res.data;
        }),
      )
      .subscribe(data => (this.persons = data));
  }

}
