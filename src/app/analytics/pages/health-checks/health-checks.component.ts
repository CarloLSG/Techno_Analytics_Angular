import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {HealthCheck} from "../../model/health-check";
import {HealthChecksService} from "../../services/health-checks.service";
import {CentersService} from "../../services/centers.service";
import {TreadmillsService} from "../../services/treadmills.service";
import {Center} from "../../model/center";
import {Treadmill} from "../../model/treadmill";


@Component({
  selector: 'app-health-checks',
  templateUrl: './health-checks.component.html',
  styleUrls: ['./health-checks.component.css']
})
export class HealthChecksComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<HealthCheck>();
  displayedColumns: string[] =[
    'recordId',
    'treadmillId',
    'serialNumber',
    'centerName',
    'date',
    'time',
    'volts',
    'watts',
    'hp'
  ]

  centers: Center[] = [];
  treadmills: Treadmill[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private healthCheck: HealthChecksService,
              private centerService: CentersService,
              private treadmillService: TreadmillsService) {
  }

  getAllHealthChecks() {
    this.healthCheck.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }

  getCenters(){
    this.centerService.getAll().subscribe((response: any) => {
      this.centers = response;
    })
  }

  getCenterName(treadmillId: number){
    const centerId = this.getCenterId(treadmillId);
    const centerName = this.centers.find((c)=> c.id === centerId);
    return centerName ? centerName.name : '';
  }

  getTreadmills(){
    this.treadmillService.getAll().subscribe((response: any) => {
      this.treadmills = response;
    })
  }

  getSerialNumber(treadmillId: number) {
    const treadmill = this.treadmills.find((t)=> t.id === treadmillId);
    return treadmill ? treadmill.serialNumber : '';
  }

  getCenterId(treadmillId: number){
    const treadmill = this.treadmills.find((t)=> t.id === treadmillId);
    return treadmill ? treadmill.centerId : '';
  }

  getDate(year: number, month: number, day: number) {
    return `${month}-${day}-${year}`;
  }

  getTime(hour: number, minute: number, second: number) {
    return `${hour}:${minute}:${second}`;
  }

  ngOnInit(): void {
    this.getAllHealthChecks();
    this.getCenters();
    this.getTreadmills();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
