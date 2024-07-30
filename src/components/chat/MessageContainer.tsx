import React from 'react'
import ChatTopbar from './ChatTopbar'
import ChatBottombar from './ChatBottombar'
import MessageList from './MessageList'

const MessageContainer = () => {
  return (
    <div className='flex flex-col justify-between w-full h-full'>
        <ChatTopbar/>
        <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
            <MessageList/>
            <ChatBottombar/>
        </div>
    </div>
  )
}

export default MessageContainer