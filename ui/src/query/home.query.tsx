import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../service/axios"

export const useGetHomeChats = () => {
    return useQuery({
        queryKey: ['get-home-chats'],
        queryFn: async () => {
            const params = new URLSearchParams(window.location.search)
            const userId = params.get('userId')
            const url = `/home-chats?userId=${userId}`
            return await axiosInstance.get(url)
        }
    })
}