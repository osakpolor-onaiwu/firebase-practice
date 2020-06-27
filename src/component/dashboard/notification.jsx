import React from 'react'
import moment from 'moment'

const Notification=(props)=>{
    const {notifications}=props
    return(
              
            <div class="card green darken-4">
                <div class="card-content white-text">
                <span class="card-title">Notification</span>
                <div className="divider"></div>
                <ul className=''>
                {notifications && notifications.map((notification)=>{
                    return(
                        <li key={notification.id}>
                            <span className='red-text'>{notification.user} </span><span className='white-text'>{notification.content}</span>
                            <div className="white-text"> {moment(notification.time.toDate()).fromNow()}</div>
                            <br/>
                        </li>
                    )
                })}
                </ul>
                </div>
            </div>

    )
}

/*here we received the notification props from the dashboard, we destructred it and returned acard teimplate fore it.
note we have access to all the fields in any document in the notification collection, 
that is why we can use notification.id (d id of the document), .user, .content and .time
we used moment to output the time. note we use the fromNow method of moment, this enables us to see things like 1minute ago*/

export default Notification