// import {Injectable} from '@angular/core';
// import {BehaviorSubject, combineLatest} from 'rxjs';
// import {AngularFireMessaging} from "@angular/fire/compat/messaging";
// import {
//   NotificationFromUserDto,
//   NotificationsData,
//   TRANG_THAI_THONG_BAO,
//   UserFireBaseTokenDto,
//   UserFireBaseTokensServiceProxy
// } from "@service-proxies/verify-service-proxies";
// import {UserSessionStateService} from '@app-ordco/services/user-session-state.service';
// import {filter} from "@node_modules/rxjs/internal/operators";
// import * as moment from 'moment';
//
// declare const platform: any;
//
// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationFireBaseService {
//
//   notification$: BehaviorSubject<NotificationFromUserDto> = new BehaviorSubject<NotificationFromUserDto>(null);
//   firebaseToken$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
//
//   constructor(private afMessaging: AngularFireMessaging,
//               private firebaseService: UserFireBaseTokensServiceProxy,
//               private userSession: UserSessionStateService,
//   ) {
//   }
//
//   init() {
//     this.requestPermission();
//     this.listen();
//     this.obsCreateFirebaseToken();
//   }
//
//   setNotification(notification: NotificationFromUserDto) {
//     this.notification$.next(notification);
//   }
//
//   private obsCreateFirebaseToken() {
//     combineLatest([
//       this.firebaseToken$.pipe(filter(x => x !== null)),
//       this.userSession.user$.pipe(filter(x => x != null))
//     ]).subscribe(([token, user]) => {
//       this.createFirebaseTokenForUser(token, (res) => {
//         console.log("createFireBaseToken", res)
//       })
//     })
//   }
//
//   private createFirebaseTokenForUser(firebaseToken: string, callBack: Function) {
//     const input = new UserFireBaseTokenDto();
//     input.version = platform.version;
//     input.platform = platform.name;
//     input.fireBaseToken = firebaseToken;
//     this.firebaseService.userCreateOrUpdateFirebaseToken(input)
//       .subscribe(res => {
//         callBack(res);
//       })
//   }
//
//   getNotification() {
//     return this.notification$.asObservable();
//   }
//
//   requestPermission() {
//     this.afMessaging.requestToken
//       .subscribe(
//         (token) => {
//           this.firebaseToken$.next(token);
//           console.log('Permission granted! Save to the server!', token);
//           // TODO: send token to server
//         },
//         (error) => {
//           console.error(error);
//         },
//       );
//   }
//
//   listen() {
//     this.afMessaging.messages
//       .subscribe((message: any) => {
//         console.log(message);
//
//         this.setNotification(new NotificationFromUserDto({
//           notificationId: message.notification.data?.NotificationId,
//           userNotificationId: message.notification.data?.UserNotificationId,
//           ngayGuiTin: moment(Date.now()),
//           dataObject: new NotificationsData({
//             message: message.notification.body,
//             title: message.notification.title,
//             properties: undefined
//           }),
//           notificationName: undefined,
//           trangThai: TRANG_THAI_THONG_BAO.CHUA_DOC,
//         }));
//         // abp.notify.info(message.notification.body, message.notification.title)
//       });
//   }
// }
//
// export interface NotificationModel {
//   body: string;
//   title: string;
//   isVisible: boolean;
// }
