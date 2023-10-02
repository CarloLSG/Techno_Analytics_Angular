import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HealthCheck} from "../model/health-check";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HealthChecksService extends BaseService<HealthCheck>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/health-checks'
  }
}
