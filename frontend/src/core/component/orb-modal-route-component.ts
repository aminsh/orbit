import { AfterViewInit, Component, Type, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalFactoryService } from '../service/modal-factory/modal-factory.service'
import { ModalComponentType } from '../service/modal-factory/modal-factory.type'

@Component({
  standalone: true,
  template: `
    <ng-template></ng-template>
  `,
})
export class OrbModalRouteComponent implements AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalFactoryService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  static isModalOpen: boolean = false

  ngAfterViewInit() {
    if (OrbModalRouteComponent.isModalOpen)
      return

    const Component = this.route.snapshot.data['Component'] as Type<ModalComponentType>

    OrbModalRouteComponent.isModalOpen = true

    this.modalService.create(
      Component,
      this.resolveRouteParameters(),
      {
        nzViewContainerRef: this.viewContainerRef,
        nzTitle: this.route.snapshot.data['title'],
      },
    )
      .afterClose
      .subscribe(() => {
        OrbModalRouteComponent.isModalOpen = false
        this.router.navigate(['.'], {relativeTo: this.route.parent})
      })
  }

  private resolveRouteParameters() {
    const result: any = {}
    const keys = (this.route.snapshot.data['paramKeys'] || []) as string[]

    if(!keys.length)
      return null

    keys.forEach(key => {
      result[key] = this.route.snapshot.paramMap.get(key)
    })

    return result
  }
}
