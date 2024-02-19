import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal'
import {inject, Injectable, Type, ViewContainerRef} from '@angular/core'
import {ModalComponentType, ModalOptionsPlus} from './modal-factory.type'
import {TranslateService} from '@ngx-translate/core'
import {ModalOptions} from 'ng-zorro-antd/modal/modal-types'
import {Nullable} from '../../type'

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
        instance.submit()
      },
      nzClosable: false,
      nzMaskClosable: false,
    })

    this.updateOptions(modal, options)

    const instance = modal.getContentComponent()
    return modal
  }

  private updateOptions(modal: NzModalRef, options?: ModalOptionsPlus) {
    const updateFunc = (value: string | object) => modal.updateConfig({
      ...options,
      nzTitle: typeof value === 'object'
        ? Object.values(value).join(' ')
        : value,
    })
    if(options?.nzTitle)
      this.translate.get(options.nzTitle).subscribe(updateFunc)

  }
}

