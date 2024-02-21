import { Pipe, PipeTransform } from '@angular/core'
import { OrbTranslateService } from './translate.service'

@Pipe({
  standalone: true,
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(
    private translate: OrbTranslateService,
  ) {
  }

  transform(value: any, ...args: any[]) {
    return this.translate.get(value)
  }
}
