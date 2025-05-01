import { useState, ReactNode, useEffect, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import useHttp from "../customhooks/useHttp";
import { socket } from "../socket";
import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../types/DataTypes";
import { APP_ENDPOINTS } from "../config/app";
import { Roles } from "../types/Roles";
import { Endpoints } from "../config/app";
import { useErrorHandler } from "../contexts/ErrorContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Helper function to get JSON data
const getJsonData = async (http: any, endpoint: string) => {
    const response = await http.get(endpoint);
    return response.data;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { get, post } = useHttp();
    const { updateError } = useErrorHandler();
    const queryClient = useQueryClient();
    const [user, setUser] = useState<UserDataType | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

    // Queries
    const { data: mentors = [] } = useQuery({
        queryKey: ['mentors'],
        queryFn: () => getJsonData(get, APP_ENDPOINTS.USER.MENTOR.FEATURED)
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['artists'],
        queryFn: () => getJsonData(get, APP_ENDPOINTS.USER.ARTIST.FEATURED)
    });

    // Session restoration
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const response = await get(Endpoints.REFRESH_TOKEN);
                if (response.status === 200) {
                    const { access_token, user } = response.data.data;
                    setAccessToken(access_token);
                    setUser(user);
                    setIsLoggedin(true);
                }
            } catch (error) {
                // Silent fail - user will need to log in
                // console.error('Session restoration failed:', error);
            }
        };

        restoreSession();
    }, [get]);

    // Mutations
    const loginMutation = useMutation({
        mutationFn: async (data: httpDataObject) => {
            const response = await post(APP_ENDPOINTS.USER.LOGIN, data);
            return response.data;
        },
        onSuccess: (data) => {
            setUser(data.user);
            setAccessToken(data.accessToken);
            setIsLoggedin(true);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            if (error instanceof Error) {
                updateError(error.message);
            } else {
                updateError('An unknown error occurred');
            }
        }
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await post(APP_ENDPOINTS.USER.LOGOUT);
        },
        onSuccess: () => {
            setUser(null);
            setAccessToken("");
            setIsLoggedin(false);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            socket.disconnect();
        },
        onError: (error) => {
            if (error instanceof Error) {
                updateError(error.message);
            } else {
                updateError('An unknown error occurred');
            }
        }
    });

    const registerMutation = useMutation({
        mutationFn: async (data: httpDataObject) => {
            const url = process.env.REACT_APP_REGISTER_API || "";
            const response = await post(url, data, { requiresAuth: false });
            return response.data;
        },
        onSuccess: async (data) => {
            if (data.errors?.length) {
                throw new Error(`Invalid data: ${data.errors.join(' ')}`);
            }
            await loginMutation.mutateAsync(data);
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

    const registerUser = async (data: httpDataObject) => {
        try {
            await registerMutation.mutateAsync(data);
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
            getUserRole, 
            accessToken,
            loading: loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
            registerUser
        }}>
            {children}
        </UserContext.Provider>
    );
};


 