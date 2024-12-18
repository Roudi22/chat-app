import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { USERS } from '@/db/dummy'
import { Info, InfoIcon, X } from 'lucide-react'
import { useSelectedUser } from '@/store/useSelectedUser'

const ChatTopbar = () => {
  const {selectedUser, setSelectedUser}= useSelectedUser();
  return (
    <div className='w-full h-20 flex p-4 justify-between items-center border-b'>
      <div className='items-center flex gap-2'>
        <Avatar className='flex justify-center items-center'>
          <AvatarImage src={selectedUser?.image || "/user-placeholder.png"}/>
        </Avatar>
        <span className='font-medium'>{selectedUser?.name}</span>
      </div>
      <div className='flex gap-2'>
        <Info className='text-muted-foreground cursor-pointer hover:text-primary'/>
        <X onClick={()=> setSelectedUser(null)} className='text-muted-foreground cursor-pointer hover:text-primary'/>
      </div>
    </div>
  )
}

export default ChatTopbar