import { AnimatePresence, motion } from "framer-motion";
import { Image as ImageIcon, MessageCircleDashed, SendIcon, ThumbsUpIcon } from "lucide-react";
import React from "react";
import { Textarea } from "../ui/textarea";
import EmojiPicker from "./EmojiPicker";

const ChatBottombar = () => {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      {!message.trim() && <ImageIcon size={24} className="cursor-pointer text-muted-foreground" />}
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
            className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0"
            ref={inputRef}
          />
          <div className="absolute right-2 bottom-0.5">
          <EmojiPicker onChange={(emoji) => {
            setMessage((prev) => prev + emoji)
            inputRef.current?.focus()
          }}/>
          </div>
        </motion.div>
        {message ? (<SendIcon size={24} className="cursor-pointer text-muted-foreground" />) : (
                  <ThumbsUpIcon size={24} className="cursor-pointer text-muted-foreground" />

        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBottombar;
