'use client';
import {
    Dispatch,
    SetStateAction,
    createContext,
    useMemo,
    useState,
    useCallback,
    useEffect
} from 'react';
import { AlertColor } from '@mui/material/Alert';

const initialSnackbarContext = {
    // open: false,
    currentCityImage: '',
    // title: '',
    // severity: 'success' as AlertColor,
    // toggleSnackbar: () => { },
    // setMessage: (() => { }) as Dispatch<SetStateAction<string>>,
    setCurrentCityImage: (() => { }) as Dispatch<SetStateAction<string>>,
};

type CurrentCityContextType = {
    // open: boolean;
    currentCityImage: string;
    // title: string;
    // severity: AlertColor;
    // toggleSnackbar: () => void;
    // setMessage: Dispatch<SetStateAction<string>>;
    setCurrentCityImage: Dispatch<SetStateAction<string>>;
    // setSeverity: Dispatch<SetStateAction<AlertColor>>;
};

export const CurrentCityContext = createContext<CurrentCityContextType>(
    initialSnackbarContext
);

export default function CurrentCityContextProvider({ children }: any) {
    const [currentCityImage, setCurrentCityImage] = useState('');
    // const [message, setMessage] = useState<string>('');
    // const [title, setTitle] = useState<string>('');
    // const [severity, setSeverity] = useState<AlertColor>('success');

    // const toggleSnackbar = useCallback(() => {
    //     setOpen(!open);
    // }, [open]);

    const value: CurrentCityContextType = useMemo(() => {
        return {
            currentCityImage,
            setCurrentCityImage
        };
    }, []);

    return (
        <CurrentCityContext.Provider value={value}>
            {children}
        </CurrentCityContext.Provider>
    );
}
