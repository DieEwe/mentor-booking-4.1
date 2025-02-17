declare module '@event-calendar/core' {
    export interface CalendarEvent {
        id: number;
        start: string;
        end: string;
        title: string;
        [key: string]: any;
    }

    export interface CalendarOptions {
        view: string;
        events: CalendarEvent[];
        height?: string | number;
        [key: string]: any;
    }

    export default class Calendar {
        constructor(element: HTMLElement, options: CalendarOptions);
        setOption(name: string, value: any): void;
        getOption(name: string): any;
        destroy(): void;
    }
}

declare module '@event-calendar/time-grid' {
    const TimeGridPlugin: {
        name: 'timeGrid';
        options?: Record<string, any>;
    };
    export default TimeGridPlugin;
}