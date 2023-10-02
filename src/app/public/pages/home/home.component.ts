import {Component, OnInit} from '@angular/core';
import {HealthChecksService} from "../../../analytics/services/health-checks.service";
import {HealthCheck} from "../../../analytics/model/health-check";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  healthChecks: HealthCheck[] = [];
  averageVolts:  number = 0;
  averageWatts: number = 0;
  averageHp: number = 0;
  constructor(private healthChecksService: HealthChecksService) {

  }

  private getHealthChecks(): void {
    this.healthChecksService.getAll().subscribe(
      (response: any) =>{
        this.healthChecks = response;
        this.averageVolts = this.calculateAverage('volts', response);
        this.averageWatts = this.calculateAverage('watts', response);
        this.averageHp = this.calculateAverage('hp', response);
        //const nonZeroHPHealthChecks = this.healthChecks.filter(check => check.hp !== 0);
        //if (this.healthChecks && this.healthChecks.length > 0) {
        /*if (nonZeroHPHealthChecks.length > 0) {
          const totalVolts = nonZeroHPHealthChecks.reduce((sum, check) => sum + check.volts, 0);
          const totalWatts = nonZeroHPHealthChecks.reduce((sum, check) => sum + check.watts, 0);
          const totalHP = nonZeroHPHealthChecks.reduce((sum, check) => sum + check.hp, 0);

          const avgVolts = (totalVolts / nonZeroHPHealthChecks.length).toFixed(2);
          const avgWatts = (totalWatts / nonZeroHPHealthChecks.length).toFixed(2);
          const avgHp = (totalHP / nonZeroHPHealthChecks.length).toFixed(2);

          this.averageVolts = parseFloat(avgVolts); // Convert the string to a number
          this.averageWatts = parseFloat(avgWatts); // Convert the string to a number
          this.averageHp = parseFloat(avgHp);
        }*/
      }
    );
  }

  private calculateAverage(property: string, response: any): number {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < response.length; i++) {
      const value = response[i][property];
      if (value !== 0) {
        sum += value;
        count++;
      }
    }

    const average = count > 0 ? sum / count : 0;
    return +average.toFixed(2);
  }

  ngOnInit(): void {
    this.getHealthChecks();
  }


}
