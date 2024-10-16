'use client';
import React, {
    Dispatch,
    SetStateAction,
    createContext,
    useMemo,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { AlertColor } from '@mui/material/Alert';

const initialAlertContext = {
    message: '',
    severity: 'success' as AlertColor,
    open: false,
    toggleAlert: () => { },
    setMessage: (() => { }) as Dispatch<SetStateAction<string>>,
    setSeverity: (() => { }) as Dispatch<SetStateAction<AlertColor>>,
};

type AlertContextType = {
    message?: string;
    open?: boolean;
    severity?: AlertColor | string;
    toggleAlert?: () => void;
    setMessage?: Dispatch<SetStateAction<string>>;
    setSeverity?: Dispatch<SetStateAction<AlertColor>>;
};

export const AlertContext = createContext<AlertContextType>(
    initialAlertContext
);

export default function AlertContextProvider({ children }: any) {
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [open, setOpen] = useState<boolean>(false);

    const toggleAlert = useCallback(() => {
        setOpen(!open);
    }, [open, message]);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
    }, [open]);

    const value: AlertContextType = useMemo(() => {
        return {
            open,
            severity,
            message,
            toggleAlert,
            setMessage,
            setSeverity
        };
    }, [open, message]);

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    );
}
