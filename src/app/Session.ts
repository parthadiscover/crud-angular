import { Injectable } from '@angular/core';

@Injectable()
export class Session {

  private storage = new Map<String, any>();


  public constructor() { }

  public getStorage(): Map<String,any> {
    return this.storage;
  }

}
