import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Details from "../src/features/Details";
import { AlertContext } from "../context/AlertContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock dynamic imports (DetailsCard and Notes)
jest.mock('../src/Components/DetailsCard', () => ({
    DetailsCard: jest.fn(() => <div data-testid="details-card" />)
}));
jest.mock('../src/Components/Notes', () => ({
    Notes: jest.fn(() => <div data-testid="note" />)
}));

const queryClient = new QueryClient();

describe('Details Component', () => {
    const mockAlertContext = {
        open: false,
        message: '',
        severity: 'info',
    };

    it('renders the DetailsCard component', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <AlertContext.Provider value={mockAlertContext}>
                    <Details />
                </AlertContext.Provider>
            </QueryClientProvider>
        );

        expect(screen.getByTestId('details-card')).toBeInTheDocument();
    });

    it('displays notes correctly', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <AlertContext.Provider value={mockAlertContext}>
                    <Details />
                </AlertContext.Provider>
            </QueryClientProvider>
        );

        const notes = screen.queryAllByTestId('note');
        expect(notes.length).toBe(0);  // Initially, there should be no notes
    });

    it('adds more notes when Add Note button is clicked', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <AlertContext.Provider value={mockAlertContext}>
                    <Details />
                </AlertContext.Provider>
            </QueryClientProvider>
        );

        const addButton = screen.getByRole('button', { name: /add note/i });
        fireEvent.click(addButton);

        // Wait for the notes to update in the DOM
        await waitFor(() => {
            const newNotes = screen.queryAllByTestId('notes-card');
            expect(newNotes.length).toBe(1);  // New note should be added
        });
    });
});
