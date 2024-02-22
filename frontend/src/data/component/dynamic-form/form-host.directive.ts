import { Directive, Type, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[formHost]'
})
export class FormHostDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {}

  createMyComponent<HasProperty>(componentType: Type<HasProperty>) {
    return this.viewContainerRef.createComponent(componentType);
  }
}
