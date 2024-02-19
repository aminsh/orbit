import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal'
import {Injectable, Type} from '@angular/core'
import {ModalComponentType, ModalConfirmParameter, ModalOptionsPlus} from './modal-factory.type'
import {TranslateService} from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class ModalFactoryService {
  constructor(
    private nzModalService: NzModalService,
    private translate: TranslateService,
  ) {
  }

  create<TResult, TComponent extends ModalComponentType, TData>(
    Component: Type<TComponent>, data?: TData, options?: ModalOptionsPlus) {
    const modal = this.nzModalService.create<TComponent, TData, TResult>({
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

    this.updateOptions(modal, options)

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

  private updateOptions(modal: NzModalRef, options?: ModalOptionsPlus) {
    const updateFunc = (value: string | object) => modal.updateConfig({
      ...options,
      nzTitle: typeof value === 'object'
        ? Object.values(value).join(' ')
        : value,
    })
    if (options?.nzTitle)
      this.translate.get(options.nzTitle).subscribe(updateFunc)
  }
}

