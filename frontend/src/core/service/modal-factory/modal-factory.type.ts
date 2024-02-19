import {ModalOptions} from 'ng-zorro-antd/modal/modal-types'

export interface ModalComponentType {
  submit(): void
  canOK: boolean
}

export type ModalOptionsPlus = Omit<ModalOptions, 'nzTitle'> & {
  nzTitle: string | string[]
}
