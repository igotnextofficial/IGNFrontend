import { useState, ReactNode, useEffect, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import useHttp from "../customhooks/useHttp";
// import { useSocket } from "../customhooks/useSocket";
import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../types/DataTypes";
import { APP_ENDPOINTS } from "../config/app";
import { Roles } from "../types/Roles";
import { Endpoints } from "../config/app";
import { useErrorHandler } from "../contexts/ErrorContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get } from "http";
 
import LocalStorage from "../storage/LocalStorage";
import { join } from "path";

const storage = new LocalStorage();
// Helper function to get JSON data
const getJsonData = async (http: any, endpoint: string) => {
    const response = await http.get(endpoint);
    return response.data;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDataType | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const { updateError } = useErrorHandler();
    const queryClient = useQueryClient();
    const [manualLoading, setIsLoading] = useState<boolean>(false);
    // const {socket,sendMessage } = useSocket({ user });
    const [loadingUser,setLoadingUser] = useState<boolean>(true);
  

    // Initialize useHttp with the current accessToken
    const { get, post } = useHttp(accessToken);

    // Queries
    const { data: mentors = [] } = useQuery({
        queryKey: ['mentors'],
        queryFn: () => getJsonData(get, APP_ENDPOINTS.USER.MENTOR.FEATURED)
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['artists'],
        queryFn: () => getJsonData(get, APP_ENDPOINTS.USER.ARTIST.FEATURED)
    });

    useEffect(() => {
      
        const user_in_storage = storage.load("user");
        if( user_in_storage && !user){
            setUser(user_in_storage);
            setIsLoggedin(true);
            setLoadingUser(false)
        }

        setLoadingUser(false);
    }, [user?.id]);
 
    // Session restoration
    const [hasAttemptedRefresh, setHasAttemptedRefresh] = useState<boolean>(false);

    useEffect(() => {
        if (hasAttemptedRefresh) return;

        const restoreSession = async () => {
            try {
                setHasAttemptedRefresh(true);
                const response = await post(Endpoints.REFRESH_TOKEN, null, { requiresAuth: false });
                if (response.status === 200) {
                    const refreshedUser = response.data?.data;
                    const refreshedToken = response.data?.access_token ?? "";

                    if (refreshedUser) {
                        setUser(refreshedUser);
                        storage.save("user", refreshedUser);
                    }

                    setAccessToken(refreshedToken);
                    setIsLoggedin(true);
                }
            } catch (error) {
                storage.remove("user");
                setUser(null);
                setAccessToken("");
                setIsLoggedin(false);
            } finally {
        
                setLoadingUser(false);
            }
        };

        restoreSession();
    }, [post, hasAttemptedRefresh]);

    useEffect(() => {
        if(!user?.id || !accessToken.trim()) return;
        const restoreUser = async () => {
            const enrichedUser = await enrichUserByRole(user);
            setUser(enrichedUser);
            return enrichedUser;
        };

        restoreUser().then((response) => {
         
        }).catch((error) => {
           
        });
    }, [user?.id, accessToken]);

    // Mutations
    const loginMutation = useMutation({
        mutationFn: async (data: httpDataObject) => {
            setIsLoading(true);
            const response = await post(APP_ENDPOINTS.USER.LOGIN, data, { requiresAuth: false });
            return response.data;
        },
        onSuccess: async (data) => {
            setUser(data.data);
            storage.save("user", data.data);
            setAccessToken(data.access_token);
            setIsLoggedin(true);
           
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            setIsLoading(false);
            if (error instanceof Error) {
                updateError(error.message);
            } else {
                updateError('An unknown error occurred');
            }
        }
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await post(APP_ENDPOINTS.USER.LOGOUT, null, 
                { requiresAuth: true });

            return response;
        },
        onSuccess: () => {
            setUser(null);
            setAccessToken("");
            storage.remove("user");
            setIsLoggedin(false);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            // socket.disconnect();
        },
        onError: (error) => {
            if (error instanceof Error) {
                updateError(error.message);
            } else {
                updateError('An unknown error occurred');
            }
        }
    });

    const updateManualLoading = (isLoading:boolean) =>{
        setIsLoading(isLoading);
    }

    const enrichUserByRole = async (baseUser: UserDataType): Promise<UserDataType> => {
        if (!baseUser?.id || !baseUser.role?.type) return baseUser;
      
        switch (baseUser.role.type) {
        //   case Roles.MENTOR: {
        //     const [availability, sessions, specialties] = await Promise.allSettled([
        //       get(`${APP_ENDPOINTS.SESSIONS.BASE}/${baseUser.id}/availability`, { requiresAuth: true }),
        //       get(`${APP_ENDPOINTS.SESSIONS.MENTOR}/${baseUser.id}`, { requiresAuth: true }),
        //       get(APP_ENDPOINTS.GENERIC.SPECIALTIES, { requiresAuth: true })
        //     ]);
      
        //     const availabilityData = availability.status === 'fulfilled'
        //       ? availability.value.data?.data?.available ?? false
        //       : false;
      
        //     const sessionData = sessions.status === 'fulfilled'
        //       ? sessions.value.data?.data ?? []
        //       : [];
        //     // really should happen on the edit profile form for a mentor
        //     if (specialties.status === 'fulfilled') {
        //       const local_storage = new LocalStorage();
        //       const specialties_data = specialties.value.data.data.map((item: any) => item.name);
        //       local_storage.save("specialties", specialties_data);
        //     }
           
      
        //     return {
        //       ...baseUser,
        //       availability: availabilityData,
        //       bookings: sessionData
        //     };
        //   }
      
          case Roles.MENTEE: {
            const [sessions] = await Promise.allSettled([
              get(`${APP_ENDPOINTS.SESSIONS.MENTEE}/${baseUser.id}`, { requiresAuth: true })
            ]);
      
            const menteeSessions = sessions.status === 'fulfilled'
              ? sessions.value.data?.data ?? []
              : [];
      
            return {
              ...baseUser,
              bookings: menteeSessions
            };
          }
      
          default:
            return baseUser;
        }
      };
      
    const registerMutation = useMutation({
        mutationFn: async (data: httpDataObject) => {
            const url = process.env.REACT_APP_REGISTER_API || "";
            const response = await post(url, data, { requiresAuth: false });
            return response.data;
        },
        onSuccess: async (data, variables) => {
            if (data.errors?.length) {
                throw new Error(`Invalid data: ${data.errors.join(' ')}`);
            }
            // Only auto-login if autoLogin is true (default) or not specified
            if (variables.autoLogin !== false) {
                setUser(data.user);
                /*sendMessage('user:created',{email:data.user.email,fullname:data.user.fullname})*/
                setAccessToken(data.access_token);
                setIsLoggedin(true);
            }
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            if (error instanceof Error) {
                updateError(error.message);
            } else {
                updateError("An unexpected error occurred during registration");
            }
        }
    });

    const attemptLoginOrLogout = async (login: boolean, data?: httpDataObject) => {
        try {
            if (login && data) {
                await loginMutation.mutateAsync(data);
                return true;
            } else {
                await logoutMutation.mutateAsync();
                return true;
            }
        } catch (error) {
            return false;
        }
    };

    const registerUser = async (data: httpDataObject, autoLogin: boolean = true) => {
        try {
            await registerMutation.mutateAsync({ ...data, autoLogin });
            return true;
        } catch (error) {
            return false;
        }
    };

    const updateUser = useCallback((userData: UserDataType | MentorDataType | ArtistDataType) => {
        setUser(userData);
        queryClient.invalidateQueries({ queryKey: ['user'] });
    }, [queryClient]);

    const getUserRole = () => user?.role?.type || "";

    return (
        <UserContext.Provider value={{ 
            user, 
            mentors, 
            artists, 
            isLoggedin, 
            attemptLoginOrLogout, 
            updateUser,
            loadingUser, 
            getUserRole, 
            accessToken,
            loading: loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
            registerUser,
            updateManualLoading
        }}>
            {children}
        </UserContext.Provider>
    );
};


 
