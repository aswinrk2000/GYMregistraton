import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { NgConfirmService } from 'ng-confirm-box'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'Mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];


  constructor(private api: ApiService,
    private router: Router,
    private toast: NgToastService,
    private confirm: NgConfirmService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.api.getRegistedUser().subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(id: number) {
    this.router.navigate(['update', id])
  }

  delete(id: number) {
    this.confirm.showConfirm("Are you Sure you want to delete?",
      () => {
        this.api.deleteRegistered(id)
          .subscribe(res => {
            this.toast.success({ detail: 'SUCCESS', summary: 'Deleted Succesfully', duration: 3000 });
            this.getUsers();
          })
      },
      ()=>{

      })
    this.api.deleteRegistered(id).subscribe(res => {

    })
  }
}
