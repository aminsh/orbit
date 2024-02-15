import {NzNotificationService} from 'ng-zorro-antd/notification'
import {TranslateService} from '@ngx-translate/core'
import {forkJoin} from 'rxjs'
import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(
    private notificationService: NzNotificationService,
    private translateService: TranslateService,
  ) {
  }

  success({title, content}: { title: string, content: string }) {
    forkJoin([
      this.translateService.get(title),
      this.translateService.get(content),
    ])
      .subscribe(([title, content]) => {
        this.notificationService.success(title, content)
      })
  }
}
