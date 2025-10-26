



import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useBasicData(chosenData) {
    return useQuery({
        queryKey: ['getBasicData', chosenData],
        enabled: !!chosenData,
        queryFn: async () => {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/${chosenData}`);
            return data;
        },
    });
}




