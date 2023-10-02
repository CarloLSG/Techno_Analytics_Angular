import { Injectable } from '@angular/core';
import {Treadmill} from "../model/treadmill";
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TreadmillsService extends BaseService<Treadmill>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/treadmills'
  }
}
