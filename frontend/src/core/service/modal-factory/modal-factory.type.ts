import { ModalOptions } from 'ng-zorro-antd/modal/modal-types'

export interface ModalComponentType {
  submit(): void
  canOK: boolean
}

export type ModalOptionsPlus = Omit<ModalOptions, 'nzTitle'> & {
  nzTitle: string
}

export interface ModalConfirmParameter {
  title: string
  content: string,
  handleOk: () => void,
  handleCancel?: () => void,
}

