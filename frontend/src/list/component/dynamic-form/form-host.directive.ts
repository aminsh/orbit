import { ComponentRef, Directive, Type, ViewContainerRef } from '@angular/core'
import { EditorComponent } from '../../../data/data.type'

@Directive({
  selector: '[formHost]'
})
export class FormHostDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
  }

  public components: ComponentRef<EditorComponent>[] = []

  createComponent<ComponentType extends EditorComponent>(componentType: Type<ComponentType>) {
    const component = this.viewContainerRef.createComponent<ComponentType>(componentType)
    this.components.push(component)
    return component
  }
}
