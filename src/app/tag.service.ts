import { Injectable } from '@angular/core';

@Injectable()
export class TagService {

  constructor() { }

}

export class Tag {
  constructor(
    public _id: string,
    public name: string,
    public description: string
  ) { }
}
