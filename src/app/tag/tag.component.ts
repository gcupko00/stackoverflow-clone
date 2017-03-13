import {Component, OnInit, Input} from '@angular/core';
import {Tag} from "@angular/compiler/src/i18n/serializers/xml_helper";

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})

export class TagComponent implements OnInit {
  @Input() public tag: Tag;

  constructor() { }

  ngOnInit() {
  }

}
