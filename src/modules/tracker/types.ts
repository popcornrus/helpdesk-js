import {ConfigInterface} from "$core/module";

export interface TrackerConfig extends ConfigInterface {
    timeout: number;
    eventsLimit: number;

    additionalInfo: object;

    onTrackerCreated: (tracker: unknown) => void;
    onTrackerEvent: (event: string) => void;
}

export interface EventQueue {
    event: string;
    timestamp: number;
    data: unknown;
}