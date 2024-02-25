import {ComponentRef, Directive, Type, ViewContainerRef} from '@angular/core'
import {FieldComponent} from '../../data.type'

@Directive({
  selector: '[formHost]'
})
export class FormHostDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
  }

  public components: ComponentRef<FieldComponent>[] = []

  createComponent<ComponentType extends FieldComponent>(componentType: Type<ComponentType>) {
    const component = this.viewContainerRef.createComponent<ComponentType>(componentType)
    this.components.push(component)
    return component
  }
}
