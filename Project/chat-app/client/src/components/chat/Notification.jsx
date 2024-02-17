import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotification";
import moment from "moment";

const Notification = () => {
    const [isOpen,setIsOpen]=useState(false);
    const {user}=useContext(AuthContext);
    const {notifications,userChats,allUsers,markAllNotificationsAsRead,markNotificationAsRead}= useContext(ChatContext);
    const unreadNotifications= unreadNotificationsFunc(notifications);

    const modifiedNotifications= notifications.map((n)=>{
        const sender= allUsers.find((user) => user._id === n.senderId);
        return {
            ...n,
            senderName: sender?.name,
        }
    })
    console.log("un",unreadNotifications);
    console.log("mn",modifiedNotifications);

    return ( 
        <div className="notifications">
            <div className="notifications-icon" onClick={()=>setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-messenger" viewBox="0 0 16 16">
  <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.64.64 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.64.64 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
</svg>
        {
            unreadNotifications?.length === 0 ? null : (
                <span className="notification-count">
                      <span>
                         {unreadNotifications?.length}
                      </span>
                </span>
            )
        }
            </div>
            { isOpen ?
            <div className="notifications-box">
                <div className="notifications-header">
                    <h3>Notifications</h3>
                    <div className="mark-as-read" onClick={()=>markAllNotificationsAsRead(notifications)}>
                        Mark all read
                    </div>
                </div>
                {
                    modifiedNotifications?.length ===0 ?<span>No notification..</span>:
                    null
                }
                {
                    modifiedNotifications && modifiedNotifications.map((n,index)=>{
                        return  <div key={index} className={n.isRead ? 'notification' : 'notification not-read'} onClick={()=>{markNotificationAsRead(n,userChats,user,notifications),setIsOpen(false)}}>
                             <span>{`${n.senderName} sent you a message`}</span>
                             <span className="notification-time">{moment(n.data).calendar()}</span>
                        </div>
                    })
                }
            </div>: null
            }
        </div>
     );
}
 
export default Notification;