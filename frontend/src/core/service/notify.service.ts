import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class OrbNotifyService {
  constructor(
    private notificationService: NzNotificationService,
  ) {
  }

  success({title, content}: { title: string, content: string }) {
    this.notificationService.success(title, content)
  }
}
