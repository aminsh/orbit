import {NzModalService} from 'ng-zorro-antd/modal'
import {Injectable, Type} from '@angular/core'
import {ModalComponentType} from './modal-factory.type'

@Injectable({
  providedIn: 'root'
})
export class ModalFactoryService {
  constructor(
    private nzModalService: NzModalService,
    //private viewContainerRef: ViewContainerRef,
  ) {
  }
  create<TComponent extends ModalComponentType, TResult extends any = {}>(
    Component: Type<TComponent>, data?: any) {
    const modal = this.nzModalService.create<TComponent, TResult>({
      nzTitle: 'Modal First instance',
      //nzViewContainerRef: this.viewContainerRef,
      nzData: data,
      nzContent: Component,
      nzOnOk: () => {
        instance.submit()
      },
      nzClosable: false,
      nzMaskClosable: false,
    })

    const instance = modal.getContentComponent()
    return modal
  }
}

