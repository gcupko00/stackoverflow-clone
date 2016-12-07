import { Component } from '@angular/core';

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})

export class TagsComponent {
  private tags: Tag[] = [];

  constructor() {
    this.tags.push(new Tag("wpf", "Lorem ipsum dolor sit amet, interdum nulla, nec quam, feugiat nisl."));
    this.tags.push(new Tag("javascript", "Ac lacinia, a in. Penatibus sit suscipit, vel nam. Et praesent parturient, pharetra nunc mauris. Id arcu."));
    this.tags.push(new Tag("wpf", "Lorem ipsum dolor sit amet, interdum nulla, nec quam, feugiat nisl."));
    this.tags.push(new Tag("javascript", "Ac lacinia, a in. Penatibus sit suscipit, vel nam. Et praesent parturient, pharetra nunc mauris. Id arcu."));
    this.tags.push(new Tag("wpf", "Lorem ipsum dolor sit amet, interdum nulla, nec quam, feugiat nisl."));
    this.tags.push(new Tag("javascript", "Ac lacinia, a in. Penatibus sit suscipit, vel nam. Et praesent parturient, pharetra nunc mauris. Id arcu."));
    this.tags.push(new Tag("wpf", "Lorem ipsum dolor sit amet, interdum nulla, nec quam, feugiat nisl."));
    this.tags.push(new Tag("javascript", "Ac lacinia, a in. Penatibus sit suscipit, vel nam. Et praesent parturient, pharetra nunc mauris. Id arcu."));
    this.tags.push(new Tag("wpf", "Lorem ipsum dolor sit amet, interdum nulla, nec quam, feugiat nisl."));
    this.tags.push(new Tag("javascript", "Ac lacinia, a in. Penatibus sit suscipit, vel nam. Et praesent parturient, pharetra nunc mauris. Id arcu."));

  }
}

class Tag {
  public tagName: string;
  public tagDescription: string;

  constructor(name: string, description: string = "") {
    this.tagName = name;
    this.tagDescription = description;
  }
}
