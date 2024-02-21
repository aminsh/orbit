import { Inject, Injectable } from '@angular/core'
import { DEFAULT_TRANSLATE_DICTIONARY } from './translate.constant'

@Injectable({providedIn: 'root'})
export class OrbTranslateService {
  constructor(
    @Inject(DEFAULT_TRANSLATE_DICTIONARY) private dictionary: any
  ) {
  }

  get(...keys: string[]): string {
    return keys.map(key => this.getOne(key)).join(' ')
  }
  private getOne(key: string): string {
    const value = this.dictionary[key]
    return value || key
  }
}
