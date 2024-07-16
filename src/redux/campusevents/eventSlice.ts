import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
    event_id: number;
    host_id: number;
    event_name: string;
    domain: string;
    description: string;
    link?: string | null;
    posted_on: string;
    start_date: string;
    start_time: string;
    end_date?: string | null;
    end_time?: string | null;
    location: string;
    speakers: string[];
    guests: string[];
    chief_guests: string[];
    club_name?: string | null;
    department?: string | null;
    edited_on?: string | null;
}

interface EventsState {
    events: Event[];
    myEvents: Event[];
    eventDetails: Event | null;
}

const initialState: EventsState = {
    events: [],
    myEvents: [],
    eventDetails: null,
};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<Event[]>) {
            state.events = action.payload;
        },
        setEventDetails(state, action: PayloadAction<Event>) {
            state.eventDetails = action.payload;
        },
    },
});

export const { setEvents, setEventDetails } = eventSlice.actions;
export default eventSlice.reducer;

    