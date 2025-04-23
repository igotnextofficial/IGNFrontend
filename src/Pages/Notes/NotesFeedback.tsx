import React, {useEffect, useState} from "react"
import { useUser } from "../../contexts/UserContext"
import ListDisplayComponent from "../../helpers/ListDisplayComponent"
import { Link } from  'react-router-dom'
import { Button, Box, Typography, Badge, Paper, Divider } from "@mui/material"
import NoDataAvailable from "../../utils/NoDataAvailable"
import axios from "axios"
import { APP_ENDPOINTS } from "../../config/app"
import { HttpMethods } from "../../types/DataTypes"
import { sendRequest } from "../../utils/helpers"

// Define a type for conversation groups
interface ConversationGroup {
    conversation_id: string;
    messages: Record<string,any>[];
    unreadCount: number;
    latestMessage: Record<string,any>;
    participants: {
        id: string;
        fullname: string;
        profile_photo_path: string;
        role: {
            type: string;
        };
    }[];
}

const loadNotes = async (
    user_id: string,
    type: "sender" | "recipient",
    access_token?: string
) => {
    try {
        const url = `${APP_ENDPOINTS.NOTES.BASE}/${user_id}/${type}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (error) {
        // console.error("Error loading notes:", error);
        return null;
    }
};

const NotesFeedback = () => {
    const { user, accessToken } = useUser()
    const [notes, setNotes] = useState<Record<string,any>[] | null>(null)
    const [conversations, setConversations] = useState<ConversationGroup[]>([])
    
    useEffect(() => {
        const load = async () => {
            if(user){ 
                try{
                    const response = await loadNotes(user.id,'recipient',accessToken);
                    const data = response.data as Record<string,any>[]
                    if(data === null || data.length === 0 ){
                        setNotes([]);
                        return;
                    }
                    
                    if(data){
                        // Group messages by conversation_id
                        const conversationMap = new Map<string, ConversationGroup>();
                        
                        data.forEach(note => {
                            const convId = note.conversation_id;
                            
                            if (!conversationMap.has(convId)) {
                                // Initialize a new conversation group
                                conversationMap.set(convId, {
                                    conversation_id: convId,
                                    messages: [],
                                    unreadCount: 0,
                                    latestMessage: note,
                                    participants: [
                                        {
                                            id: note.sender.id,
                                            fullname: note.sender.fullname,
                                            profile_photo_path: note.sender.profile_photo_path,
                                            role: note.sender.role
                                        }
                                    ]
                                });
                            }
                            
                            const conversation = conversationMap.get(convId)!;
                            conversation.messages.push(note);
                            
                            // Update unread count
                            if (note.status === "unread") {
                                conversation.unreadCount++;
                            }
                            
                            // Update latest message if this one is newer
                            const currentDate = new Date(conversation.latestMessage.created_at);
                            const newDate = new Date(note.created_at);
                            if (newDate > currentDate) {
                                conversation.latestMessage = note;
                            }
                        });
                        
                        // Convert map to array and sort by latest message date
                        const conversationArray = Array.from(conversationMap.values());
                        conversationArray.sort((a, b) => {
                            const dateA = new Date(a.latestMessage.created_at);
                            const dateB = new Date(b.latestMessage.created_at);
                            return dateB.getTime() - dateA.getTime();
                        });
                        
                        setConversations(conversationArray);
                        setNotes(data);
                    }
                }
                catch(error){
                    console.error("Error loading notes:", error);
                    return null;
                }
            }
        }
        
        load()
    },[user,accessToken])

    const markConversationAsRead = async (conversationId: string) => {
        try {
            // Since we don't have a direct endpoint to mark an entire conversation as read,
            // we'll need to mark each unread message in the conversation individually
            const conversation = conversations.find(conv => conv.conversation_id === conversationId);
            
            if (conversation) {
                // Get all unread messages in the conversation
                const unreadMessages = conversation.messages.filter(message => message.status === "unread");
                
                if (unreadMessages.length > 0) {
                    // Create an array of promises for marking each message as read
                    const markAsReadPromises = unreadMessages.map(message => {
                        const url = `${APP_ENDPOINTS.NOTES.BASE}/${message._id}`;
                        return sendRequest(HttpMethods.GET, url, null, {Authorization:`Bearer ${accessToken}`});
                    });
                    
                    // Execute all promises in parallel and continue even if some fail
                    const results = await Promise.allSettled(markAsReadPromises);
                    
                    // Log any failures for debugging
                    results.forEach((result, index) => {
                        if (result.status === 'rejected') {
                            console.error(`Failed to mark message ${unreadMessages[index]._id} as read:`, result.reason);
                        }
                    });
                }
                
                // Update local state to reflect the change regardless of API success
                setConversations(prevConversations => 
                    prevConversations.map(conv => 
                        conv.conversation_id === conversationId 
                            ? { ...conv, unreadCount: 0 } 
                            : conv
                    )
                );
            }
        } catch (error) {
            console.error("Error marking conversation as read:", error);
        }
    };

    return (
        conversations && conversations.length > 0 ? (
            <Box sx={{ maxWidth: "800px", mx: "auto" }}>
                {conversations.map(conversation => {
                    const latestMessage = conversation.latestMessage;
                    const otherParticipant = latestMessage.sender.id === user?.id 
                        ? latestMessage.recipient 
                        : latestMessage.sender;
                    
                    // Truncate message for display
                    const messagePreview = latestMessage.message.length > 50 
                        ? `${latestMessage.message.substring(0, 50)}...` 
                        : latestMessage.message;
                    
                    return (
                        <Paper 
                            key={conversation.conversation_id}
                            elevation={1}
                            sx={{ 
                                mb: 2, 
                                p: 2,
                                borderRadius: 2,
                                borderLeft: conversation.unreadCount > 0 ? "4px solid #fd2f30" : "none"
                            }}
                        >
                            <Link 
                                to={`/notes/${latestMessage._id}`} 
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                onClick={() => markConversationAsRead(conversation.conversation_id)}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ position: 'relative', mr: 2 }}>
                                        <img 
                                            src={otherParticipant.profile_photo_path || "https://via.placeholder.com/50"} 
                                            alt={otherParticipant.fullname}
                                            style={{ 
                                                width: 50, 
                                                height: 50, 
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        {conversation.unreadCount > 0 && (
                                            <Badge 
                                                badgeContent={conversation.unreadCount} 
                                                color="error"
                                                sx={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    right: -5
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {otherParticipant.fullname}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(latestMessage.created_at).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            {latestMessage.subject}
                                        </Typography>
                                        <Typography variant="body2" sx={{ 
                                            color: conversation.unreadCount > 0 ? 'text.primary' : 'text.secondary',
                                            fontWeight: conversation.unreadCount > 0 ? 'medium' : 'regular'
                                        }}>
                                            {messagePreview}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </Paper>
                    );
                })}
            </Box>
        ) : <NoDataAvailable/>
    )
}

export default NotesFeedback
