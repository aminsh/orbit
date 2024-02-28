import { NzModalService } from 'ng-zorro-antd/modal'
import { Injectable, Type } from '@angular/core'
import { ModalComponentType, ModalConfirmParameter, ModalOptionsPlus } from './modal-factory.type'

@Injectable({
  providedIn: 'root'
})
export class ModalFactoryService {
  constructor(
    private nzModalService: NzModalService,
  ) {
  }

  create<TResult, TComponent extends ModalComponentType, TData>(
    Component: Type<TComponent>, data?: TData, options?: ModalOptionsPlus) {
    const modal = this.nzModalService.create<TComponent, TData, TResult>({
      nzTitle: options?.nzTitle || '',
      nzData: data,
      nzContent: Component,
      nzOnOk: () => {
        if (!instance.canOK)
          return false
        instance.submit()
        return true
      },
      nzClosable: false,
      nzMaskClosable: false,
    })

    const instance = modal.getContentComponent()
    return modal
  }


  confirm(params: ModalConfirmParameter) {
    this.nzModalService.confirm({
      nzTitle: params.title,
      nzContent: params.content,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: params.handleOk,
    })
  }
}

