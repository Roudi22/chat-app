"use client";
import React from 'react'
import { Button } from './ui/button'
import { MoonIcon, SunIcon, Volume2 } from 'lucide-react'
import { useTheme } from 'next-themes'

const PreferencesTap = () => {
    const {theme,setTheme} = useTheme()
    console.log(theme)
  return (
    <div className='flex flex-wrap gap-2 px-1 md:p-2'>
        <Button onClick={()=> setTheme("light")} variant={"outline"} size={"icon"}>
            <SunIcon className='size-[1.2rem] text-muted-foreground' />
        </Button>
        <Button onClick={()=> setTheme("dark")} variant={"outline"} size={"icon"}>
            <MoonIcon className='size-[1.2rem] text-muted-foreground' />
        </Button>
    </div>
  )
}

export default PreferencesTap