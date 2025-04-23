import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/helpers'
import { useParams } from 'react-router-dom'
import { ArtistDataType, HttpMethods, MentorDataType, UserDataType } from '../../types/DataTypes'
import { Typography, Grid, Avatar, Button, Box, Paper, Divider, TextField, CircularProgress, IconButton, Tooltip } from '@mui/material'
import { NotesFormStructure } from '../../formstructures/NotesFormStructure'
import MainHolderComponent from '../../helpers/MainHolderComponent'
import IgnFormGenerate from '../../components/IgnFormGenerate'
import { useFormDataContext } from '../../contexts/FormContext'
import { useUser } from '../../contexts/UserContext'
import FormDataProvider from '../../providers/FormDataProvider'
import { APP_ENDPOINTS } from '../../config/app'
import CircularImage from '../../utils/CircularImage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const MessageReaderReplyData = () => {
    const { user, accessToken } = useUser() 
    const { data, updateFormData } = useFormDataContext()
    const { note_id } = useParams()
    const [note, setNote] = useState<Record<string,any> | null>(null)
    const [conversation, setConversation] = useState<Record<string,any>[]>([])
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState("")
    const [replyTo, setReplyTo] = useState<UserDataType| MentorDataType| ArtistDataType | null>(null)
    const [replyMessage, setReplyMessage] = useState("")
    const [conversationId, setConversationId] = useState<string>("")
    const [pendingMessage, setPendingMessage] = useState<Record<string,any> | null>(null)

    useEffect(() => {
        if(status === 'success'){
            // Refresh the conversation after sending a reply
            if (conversationId) {
                loadConversation(conversationId)
            }
            // Clear pending message immediately after success
            setPendingMessage(null)
        }
    },[status, conversationId])

    useEffect(() => {
        note && setReplyTo(note.sender.id)
    },[note])

    useEffect(()=> {
        const loadMessage = async () => {
            const url = `${APP_ENDPOINTS.NOTES.BASE}/${note_id}`
            let response = await sendRequest(HttpMethods.GET, url, null, {Authorization:`Bearer ${accessToken}`})
            if(response){
                setNote(response.data)
                // Extract conversation_id from the note
                if (response.data.conversation_id) {
                    setConversationId(response.data.conversation_id)
                    // Load the full conversation
                    loadConversation(response.data.conversation_id)
                }
            }
        }

        loadMessage()
    },[note_id, accessToken])

    const loadConversation = async (convId: string) => {
        try {
            // Use the correct endpoint format
            const url = `${APP_ENDPOINTS.NOTES.BASE}/${user?.id}/${convId}/conversation`
            let response = await sendRequest(HttpMethods.GET, url, null, {Authorization:`Bearer ${accessToken}`})
            if(response && response.data){
                // Sort messages by creation date (oldest first)
                const sortedMessages = response.data.sort((a: any, b: any) => 
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                )
                setConversation(sortedMessages)
                return;
            }
            
            // Fallback: If no conversation data, just show the current message
            if (note) {
                setConversation([note]);
            }
        } catch (error) {
            console.error("Error loading conversation:", error)
            // Fallback to showing just the current message
            if (note) {
                setConversation([note]);
            }
        }
    }

    const handleSubmit = async(e: React.MouseEvent) => {
        e.preventDefault(); // Prevent any default behavior
        
        if (!replyMessage.trim()) {
            setStatus('error');
            setStatusMessage("Please enter a message");
            return;
        }
        
        setStatus('loading');
        
        // Create a pending message to show in the conversation
        const pendingMsg = {
            _id: 'pending-' + Date.now(),
            message: replyMessage,
            sender_id: user?.id,
            sender: user,
            created_at: new Date().toISOString(),
            isPending: true
        };
        setPendingMessage(pendingMsg);
        
        // Update the form data context with our custom message
        await updateFormData("message", replyMessage);
        
        const _data = {
            ...note, 
            ...data, 
            sender_id: user?.id, 
            sender: user, 
            recipient_id: note?.sender_id, 
            recipient: note?.sender,
            conversation_id: conversationId, // Include the conversation_id in the reply
            message: replyMessage // Explicitly set the message to the reply message
        }
        let url = `${APP_ENDPOINTS.NOTES.BASE}`

        try {
            let response = await sendRequest(HttpMethods.POST, url, {"data":_data}, {Authorization:`Bearer ${accessToken}`})
            if(response){
                setStatus('success');
                setStatusMessage("Message sent successfully");
                setReplyMessage(""); // Clear the reply field after successful submission
                
                // Reset status after 3 seconds
                setTimeout(() => {
                    setStatus('idle');
                    setStatusMessage("");
                }, 3000);
            }
        } catch (error) {
            console.error("Error sending reply:", error);
            setStatus('error');
            setStatusMessage("Failed to send message. Please try again.");
            
            // Reset status after 3 seconds
            setTimeout(() => {
                setStatus('idle');
                setStatusMessage("");
            }, 3000);
        }
    }
    
    return note && (
        <MainHolderComponent>
            <Paper 
                elevation={2} 
                sx={{ 
                    p: 0, 
                    maxWidth: "1600px", 
                    mx: "auto", 
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90vh'
                }}
            >
                {/* Header Section */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    p: 2, 
                    borderBottom: '1px solid #e0e0e0', 
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                    width: '100%'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CircularImage image={note.sender.profile_photo_path} size={60} />
                        <Box sx={{ml:2}}>
                            <Typography variant="h5" sx={{ fontWeight: 500 }}>
                                {note.sender.fullname}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {note.sender.role.type}
                            </Typography>
                        </Box>
                    </Box>
                    
                    {note.subject && (
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ 
                                backgroundColor: '#f9f1c5',
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '10px',
                                borderRadius: '5px',
                                fontWeight: 'normal',
                                color: '#000'
                            }}>
                                <MailOutlineIcon sx={{ mr: 1, fontSize: '1rem' }} />
                                Subject: {note.subject}
                            </Typography>
                        </Box>
                    )}
                </Box>
                
                {/* Messages Section - Scrollable */}
                <Box sx={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {conversation.length > 0 ? (
                        <>
                            {conversation.map((msg, index) => (
                                <Paper 
                                    key={msg._id || index}
                                    variant="outlined" 
                                    sx={{ 
                                        p: 2, 
                                        mb: 2, 
                                        bgcolor: msg.sender_id === user?.id ? "rgba(0, 0, 0, 0.05)" : "background.default",
                                        borderColor: "divider",
                                        ml: msg.sender_id === user?.id ? "auto" : "0",
                                        mr: msg.sender_id === user?.id ? "0" : "auto",
                                        maxWidth: "80%"
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Avatar 
                                            alt={`${msg.sender.fullname}`} 
                                            src={`${msg.sender.profile_photo_path}`} 
                                            sx={{ width: 30, height: 30, mr: 1 }}
                                        />
                                        <Typography variant="subtitle2">
                                            {msg.sender.fullname}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                            {new Date(msg.created_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                                        {msg.message}
                                    </Typography>
                                </Paper>
                            ))}
                            
                            {/* Pending message with status indicator */}
                            {pendingMessage && (
                                <Paper 
                                    variant="outlined" 
                                    sx={{ 
                                        p: 2, 
                                        mb: 2, 
                                        bgcolor: "rgba(0, 0, 0, 0.05)",
                                        borderColor: "divider",
                                        ml: "auto",
                                        mr: "0",
                                        maxWidth: "80%",
                                        position: "relative"
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Avatar 
                                            alt={`${pendingMessage.sender.fullname}`} 
                                            src={`${pendingMessage.sender.profile_photo_path}`} 
                                            sx={{ width: 30, height: 30, mr: 1 }}
                                        />
                                        <Typography variant="subtitle2">
                                            {pendingMessage.sender.fullname}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                            {new Date(pendingMessage.created_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", flex: 1 }}>
                                            {pendingMessage.message}
                                        </Typography>
                                        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                                            {status === 'loading' && (
                                                <CircularProgress size={20} />
                                            )}
                                            {status === 'success' && (
                                                <Tooltip title={statusMessage}>
                                                    <CheckCircleIcon color="success" fontSize="small" />
                                                </Tooltip>
                                            )}
                                            {status === 'error' && (
                                                <Tooltip title={statusMessage}>
                                                    <ErrorIcon color="error" fontSize="small" />
                                                </Tooltip>
                                            )}
                                        </Box>
                                    </Box>
                                </Paper>
                            )}
                        </>
                    ) : (
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                            No messages in this conversation yet.
                        </Typography>
                    )}
                </Box>
                
                {/* Reply Section */}
                <Box sx={{ 
                    p: 3, 
                    borderTop: '1px solid #e0e0e0',
                    bgcolor: 'background.paper'
                }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Your Reply
                    </Typography>
                    <Box component="div">
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Message"
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            variant="filled"
                            placeholder="Enter your message"
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button 
                                variant="contained" 
                                onClick={handleSubmit}
                                disabled={status === 'loading'}
                                sx={{ 
                                    bgcolor: "black",
                                    color: "white",
                                    py: 1.5,
                                    px: 4,
                                    "&:hover": { 
                                        bgcolor: "rgba(0, 0, 0, 0.8)"
                                    }
                                }}
                            >
                                Send Reply
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </MainHolderComponent>
    )
}

const MessageReaderReply = () => {
    return (
        <FormDataProvider>
            <MessageReaderReplyData/>
        </FormDataProvider>
    )
}

export default MessageReaderReply