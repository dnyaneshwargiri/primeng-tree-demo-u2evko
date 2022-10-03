import { Component, OnInit } from '@angular/core';
import { NodeService } from './nodeservice';
import { TreeNode } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TreeDragDropService],
})
export class AppComponent {
  files1: TreeNode[];

  files2: TreeNode[];
  selectedFiles: TreeNode[];
  draggedNode: any;
  constructor(
    private nodeService: NodeService,
    private service: TreeDragDropService
  ) {}

  ngOnInit() {
    this.nodeService.getFiles().then((files) => (this.files1 = files));
    this.nodeService.getFiles().then((files) => (this.files2 = files));

    this.service.dragStart$.subscribe((draggedNode) => {
      this.draggedNode = draggedNode;
    });
  }

  expandAll() {
    this.files2.forEach((node) => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.files2.forEach((node) => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  drag(event: any) {
    // event.dataTransfer.setData('data', this.draggedNode);
  }
  allowDrop(ev: any) {
    ev.preventDefault();
  }
  drop(ev: any) {
    // console.log(ev.dataTransfer.getData('data'));
    console.log(this.draggedNode);
    document.getElementById('droparea').innerHTML = this.draggedNode.node.label;
    ev.preventDefault();
  }
}
