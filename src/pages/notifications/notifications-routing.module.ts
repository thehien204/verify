import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListNotificationsComponent} from "./list/list-notifications.component";
import {NotificationsFromUserComponent} from "./notifications-from-user/notifications-from-user.component";

const routes: Routes = [
  {path: 'list', component: ListNotificationsComponent},
  {path: 'notifications-from-user', component: NotificationsFromUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
