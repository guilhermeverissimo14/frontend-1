import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  EyeOutline,
  DeleteOutline,
  EnvironmentOutline,
  PlusOutline,
  LockOutline,
  UserOutline,
  HomeOutline,
  TeamOutline,
  DiffOutline,
  LogoutOutline,
  EyeInvisibleOutline,
  MailOutline,
  UserAddOutline,
  ArrowLeftOutline,
  SyncOutline,
  MedicineBoxOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  EyeOutline,
  DeleteOutline,
  EnvironmentOutline,
  PlusOutline,
  LockOutline,
  UserOutline,
  HomeOutline,
  TeamOutline,
  DiffOutline,
  LogoutOutline,
  EyeInvisibleOutline,
  MailOutline,
  UserAddOutline,
  ArrowLeftOutline,
  SyncOutline,
  MedicineBoxOutline,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {}
