import { AnimatePresence, motion } from "framer-motion";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import {
  Image as ImageIcon,
  Loader,
  
  SendHorizontal,
  
  ThumbsUp,
  
} from "lucide-react";
import React, { useEffect } from "react";
import { Textarea } from "../ui/textarea";
import EmojiPicker from "./EmojiPicker";
import { useMutation } from "@tanstack/react-query";
import { sendMessageAction } from "@/actions/message.actions";
import { useSelectedUser } from "@/store/useSelectedUser";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent } from "../ui/dialog";
import { pusherClient } from "@/lib/pusher";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Message } from "@/db/dummy";

const ChatBottombar = () => {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
   const {selectedUser}= useSelectedUser()
    const {user:currentUser} = useKindeBrowserClient()
  const [imgUrl, setImgUrl] = React.useState("");
  const queryClient = useQueryClient();
  const { mutate:sendMessage, isPending } = useMutation({
    mutationFn: sendMessageAction,
  });
  const handleSendMessage = () => {
    if(!message.trim()) return;
    sendMessage({content: message, messageType: "text", recieverId: selectedUser?.id!});
    setMessage("");
    inputRef.current?.focus();
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}

		if (e.key === "Enter" && e.shiftKey) {
			e.preventDefault();
			setMessage(message + "\n");
		}
	};
  useEffect(() => {
    const channelName = `${currentUser?.id}__${selectedUser?.id}`.split("__").sort().join("__");
    const channel = pusherClient?.subscribe(channelName);

    const handleNewMessage = (data:{message:Message}) => { 
      queryClient.setQueryData(["messages", selectedUser?.id], (oldMessages:Message[]) => {
        return [...oldMessages , data.message]
      })
    }
    channel?.bind("newMessage", handleNewMessage);

    return () => {
      channel?.unbind("newMessage", handleNewMessage);
      pusherClient?.unsubscribe(channelName);
    }

  }, [selectedUser?.id, currentUser?.id, queryClient]);
  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      {!message.trim() && (
        <CldUploadWidget
        signatureEndpoint={'/api/sign-cloudinary-params'}
        onSuccess={(result, {widget}) => {
          widget.close();
          setImgUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
        }}
        >
          {({open}) => {
            return (
              <ImageIcon onClick={()=> open()} size={24} className="cursor-pointer text-muted-foreground" />
            )
          }}
        </CldUploadWidget>
      )}

      <Dialog open={!!imgUrl}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Image Preview</DialogTitle>
					</DialogHeader>
					<div className='flex justify-center items-center relative h-96 w-full mx-auto'>
						<Image src={imgUrl} alt='Image Preview' fill className='object-contain' />
					</div>

					<DialogFooter>
						<Button
							type='submit'
							onClick={() => {
								sendMessage({ content: imgUrl, messageType: "image", recieverId: selectedUser?.id! });
								setImgUrl("");
							}}
						>
							Send
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

      <AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            layout: {
              type: "spring",
              bounce: 0.25,
            },
          }}
          className="w-full relative"
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            autoComplete="off"
            onKeyDown={handleKeyDown}
            className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0"
            ref={inputRef}
          />
          <div className="absolute right-2 bottom-0.5">
            <EmojiPicker
              onChange={(emoji) => {
                setMessage((prev) => prev + emoji);
                inputRef.current?.focus();
              }}
            />
          </div>
        </motion.div>
        {message.trim() ? (
					<Button
						className='h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
						variant={"ghost"}
						size={"icon"}
						onClick={handleSendMessage}
					>
						<SendHorizontal size={20} className='text-muted-foreground' />
					</Button>
				) : (
					<Button
						className='h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
						variant={"ghost"}
						size={"icon"}
					>
						{!isPending && (
							<ThumbsUp
								size={20}
								className='text-muted-foreground'
								onClick={() => {
									sendMessage({ content: "👍", messageType: "text", recieverId: selectedUser?.id! });
								}}
							/>
						)}
						{isPending && <Loader size={20} className='animate-spin' />}
					</Button>
				)}
      </AnimatePresence>
    </div>
  );
};

export default ChatBottombar;
