import {useState,useEffect,useMemo} from 'react';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { useParams,useNavigate } from 'react-router-dom';
import {SessionCall }from '../../sockets/SessionCall';
import { useUser } from '../../contexts/UserContext';
import useHttp from '../../customhooks/useHttp';
import { IceCandidate } from '../../types/rtcTypes';
import { APP_ENDPOINTS } from '../../config/app';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(utc);
dayjs.extend(isBetween);

type validRole = 'mentor' | 'mentee' | 'admin'| undefined


const VideoCall = () => {
    const {sessionId = ''} = useParams<{sessionId:string}>();
    const navigate = useNavigate();
    const {user,loadingUser,accessToken} = useUser();
    const {put,get,post} = useHttp();
    const [rtcConfig,setRtcConfig] = useState<RTCConfiguration | null>(null);
     
   
    const jwt = accessToken;
    const user_id = user?.id;
    const role: validRole =  user?.role?.type === 'mentor' || user?.role?.type === 'mentee'
    ? user.role.type
    : undefined;

    // useEffect(() => {
    //    const fn = async () => {
    //       console.log(`bringing back sessions`)
    //      const {data}=  await get('https://xavier.igotnext.local/api/sessions/00ce7293-0231-48a0-98bb-923b8a3a154f');
    //      console.log(JSON.stringify(data))
    //      return data
    //    }

    //    fn().catch(err => {console.log(err)})

      
    // },[])
    const userHasAccessToSession = async () => {
      const url = `${APP_ENDPOINTS.SESSIONS.BASE}/${sessionId}`;
      // const url = 'https://xavier.igotnext.local/api/sessions/00ce7293-0231-48a0-98bb-923b8a3a154f'
      const {data,status }=  await get(url);
        if(status !== 200){throw new Error('error when getting data')}
      const correct_session = data.id === sessionId;
      const today = dayjs()
      const fifteen_minutes_before = dayjs(data.start_time).subtract(15,'minutes');
      const session_end = dayjs(data.end_time);
      const is_between_session = today.isBetween(fifteen_minutes_before,session_end);
      const booking = data.bookings;
      const valid_user = [ booking.mentor_id,booking.mentee_id].includes(user_id);
      const session_couunt_within_range = booking.current_session <= booking.session_limit;
      const isConfirmed = booking.status === 'confirmed'
      const valid = Boolean(correct_session && is_between_session && valid_user && isConfirmed && session_couunt_within_range)
      const response = valid ? {status,data} : {status:400,data:'something went wrong'}
      return response;
    }

    const {data,isLoading,isError} = useQuery({
      queryKey:['userHasAccessToSession',sessionId,user?.id],
      enabled: Boolean(user_id && sessionId && jwt),
      retry:false,
      queryFn:userHasAccessToSession,

    })

    const hasAccess = !isError && data?.status === 200;
    
    useEffect(() => {
        if(!user || !accessToken || !hasAccess || isError) {return}

        let cancelled = false;
 
        (async () => {
            const url = APP_ENDPOINTS.VIDEOCALL.ICE_SERVERS.replace(':user_id',user?.id);
            const {data} = await get(url,{requiresAuth:true});

            if(!cancelled){
                setRtcConfig({iceServers:data.iceServers,iceCandidatePoolSize:4})
                
            }
        })().catch((e) => {
             console.error("ICE fetch failed:", e);
            // Fallback to STUN-only so you can still test locally
            setRtcConfig({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            iceCandidatePoolSize: 4,
            });
        }) 
    },[user?.id,accessToken])
    // const _rtcConfig = useMemo(() => {
    
    // const turn_url  = process.env.REACT_APP_TURN_URL;
    // const turn_user = process.env.REACT_APP_TURN_USERNAME;
    // const turn_cred = process.env.REACT_APP_TURN_CREDENTIAL;

    // const servers:RTCIceServer[] = [{urls:'stun:stun.l.google.com:19302'}];
    // if(turn_url && turn_user && turn_cred){
    //     servers.push({urls:turn_url,username:turn_user,credential: turn_cred})
    // }
    // return { iceServers: servers, iceCandidatePoolSize: 4 };
    // },[])
    const signaling_url = process.env.REACT_APP_SIGNALING_URL || undefined ;
    const logo_url = './images/logo.png';
   
  
  if (loadingUser) return <div style={{ padding: 24 }}>Loading your profile…</div>;
  if (!user_id) return <div style={{ padding: 24, color: "#c00" }}>Missing user id.</div>;
  if (!sessionId) return <div style={{ padding: 24, color: "#c00" }}>Missing session id in the URL.</div>;
  if (!user) return <div style={{ padding: 24, color: "#c00" }}>You must be signed in.</div>;
  if (!jwt) return <div style={{ padding: 24, color: "#c00" }}>Missing auth token.</div>;
  if (!role) return <div style={{ padding: 24, color: "#c00" }}>Your role is not allowed for calls.</div>;
  if (isLoading) return <div style={{ padding: 24 }}>Checking to see if you have access to this session...</div>;
  if (!hasAccess || isError) return <div style={{ padding: 24, color: "#c00" }}>You do not have access to this session.</div>;
  
  const uploadRecording = async (blob:Blob) => {

  }
    return  (
    <div style={{ height: "100%", width: "100%" }}>
      <SessionCall
        jwt={jwt}
        sessionId={sessionId}
        role={role}
        userId={user_id}
        signalingUrl={signaling_url}
        rtcConfig={rtcConfig}
        logoUrl={logo_url}
        onRecordingAvailable={uploadRecording} // remove if you don’t want auto-upload
      />
    </div>
    )
}

export default VideoCall