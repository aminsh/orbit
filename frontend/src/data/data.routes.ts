import {Routes} from '@angular/router'
import {DataLayoutComponent} from './component/data-layout.component'
import {DataStorageComponent} from './component/data-storage.component'
import {AuthGuard} from '../user/service/auth.guard'
import {DataModelsComponent} from './component/data-models.component'
import {OrbModalRouteComponent} from '../core/component/orb-modal-route-component'
import {DataStorageEntryComponent} from './component/data-storage-entry.component'
import {DataModelEntryComponent} from './component/data-model-entry.component'

export const routes: Routes = [
  {
    path: 'data',
    component: DataLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'storage',
        component: DataStorageComponent,
      },
      {
        path: 'model',
        component: DataModelsComponent,
        children: [
          {
            path: ':id/edit',
            component: OrbModalRouteComponent,
            data: {
              Component: DataModelEntryComponent,
              title: ['edit', 'data_model']
            }
          }
        ]
      },
    ]
  }
]
