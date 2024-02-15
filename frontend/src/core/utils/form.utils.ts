import {FormGroup} from '@angular/forms'

export const makeFormDirty = (formGroup: FormGroup) =>  {
  Object.values(formGroup.controls).forEach(control => {
    if (control.invalid) {
      control.markAsDirty()
      control.updateValueAndValidity({onlySelf: true})
    }
  })
}
