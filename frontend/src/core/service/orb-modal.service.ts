import { Injectable } from '@angular/core'
import { ConfirmType, NzModalRef, NzModalService } from 'ng-zorro-antd/modal'
import { ModalOptions } from 'ng-zorro-antd/modal/modal-types'
import { OrbTranslateService } from './translate'

@Injectable({providedIn: 'root'})
export class OrbModalService {
  constructor(
    private nzModalService: NzModalService,
    private translate: OrbTranslateService,
  ) {
  }

  create<TContent, TData, TResult>(options: ModalOptions<TContent, TData, TResult>): NzModalRef<TContent, TResult> {
    return this.nzModalService.create({
      nzClosable: false,
      nzMaskClosable: false,
      ...options,
    })
  }

  confirm<TContent>(options: ModalOptions<TContent>, confirmType?: ConfirmType): NzModalRef<TContent> {
    return this.nzModalService.confirm({
      nzOkText: this.translate.get('yes'),
      nzCancelText: this.translate.get('no'),
      ...options,
    })
  }
}
