import {AfterViewInit, Component, OnInit, Type, ViewContainerRef} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {ModalFactoryService} from '../service/modal-factory/modal-factory.service'
import {ModalComponentType} from '../service/modal-factory/modal-factory.type'

@Component({
  standalone: true,
  template: `
    <ng-template></ng-template>
  `
})
export class OrbModalRouteComponent implements AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalFactoryService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  ngAfterViewInit(): void {
    const Component = this.route.snapshot.data['Component'] as Type<ModalComponentType>
    this.modalService.create(
      Component,
      {
        id: this.route.snapshot.paramMap.get('id')
      },
      {
        nzViewContainerRef: this.viewContainerRef,
        nzTitle: this.route.snapshot.data['title'],
      }
    )
      .afterClose
      .subscribe(() => {
        this.router.navigate(['../../'], {relativeTo: this.route})
      })
  }
}
