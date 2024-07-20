import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../service/axios"

export const useGetHomeChats = () => {
    return useQuery({
        queryKey: ['get-home-chats'],
        queryFn: async () => {
            const url = `/home-chats?userId=2`
            return await axiosInstance.get(url)
        }
    })
}