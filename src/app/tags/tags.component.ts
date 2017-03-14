import {Component, OnInit} from '@angular/core';
import { TagService } from "../services/tag.service";
import {Tag} from "../../model/Tag";
import {AuthGuardService} from "../services/auth-guard.service";

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  providers: [TagService, AuthGuardService],
  styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit {
  private tags: Tag[] = [];
  private page = 1;
  private filter = "";
  private tagExists = false;
  private showNewTagForm = false;
  private descrWarn = false;
  private newTagName;
  private newTagDescription;

  constructor(
    private tagService: TagService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit() {
    this.getTags();
  }

  private filterTags(filter: HTMLInputElement) {
    this.filter = filter.value;
    this.getTags();
  }

  private checkTagExists() {
    this.tagExists = false;
    if (this.newTagName.length > 0)
      this.getTag(this.newTagName);
  }

  private onSubmit() {
    if (this.newTagDescription.length < 16 || this.newTagDescription.length > 256) {
      this.descrWarn = true;
      return;
    }

    this.tagService.postTag(new Tag(null, this.newTagName, this.newTagDescription, 0, null)).subscribe(
      tag => {
        this.getTags();
        this.showNewTagForm = false;
        this.newTagDescription = "";
        this.newTagName = "";
      },
      error => console.log(error)
    );
  }

  private getTags() {
    this.tagService.getTags(this.page, this.filter).subscribe(
      tags => this.tags = tags,
      error => console.log(error)
    );
  }

  private getTag(tagName: string) {
    this.tagService.getTag(tagName).subscribe(
      tag => {
        if (tag.name)
          this.tagExists = true;
        else
          this.tagExists = false;
      },
      error => this.tagExists = false
    );
  }
}
