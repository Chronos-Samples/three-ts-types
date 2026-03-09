/**
 * The minimal basic Event that can be dispatched by a {@link EventDispatcher}.
 */
export interface BaseEvent<TEventType extends string = string> {
    readonly type: TEventType;
}

/**
 * The minimal expected contract of a fired Event that was dispatched by a {@link EventDispatcher}.
 */
export class Event<TEventType extends string = string, TTarget = unknown> {
    /**
     * Creates event object.
     */
    constructor(eventData: { type: TEventType } & { [prop: string]: any }, options?: EventOptions);

    type: TEventType;
    target?: TTarget;
    private path: Array<EventDispatcher> | null;
    [attachment: string]: any;
    stopQueue: () => void;
    stopBubbling: () => void;
}

export interface EventOptions {
    bubbles?: boolean;
}

export interface EventListenerOptions {
    priority?: number;
}

export type EventListener<TEventType extends string = string, TTarget = unknown> = (
    event: Event<TEventType, TTarget>,
) => void;

/**
 * JavaScript events for custom objects
 *
 * @source src/core/EventDispatcher.js
 */
export class EventDispatcher {
    /**
     * Creates {@link THREE.EventDispatcher | EventDispatcher} object.
     */
    constructor();

    /**
     * Adds a listener to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     * @param options Additional settings for event listener.
     */
    addEventListener(type: string, listener: EventListener<string, this>, options?: EventListenerOptions): void;

    /**
     * Checks if listener is added to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    hasEventListener(type: string, listener: EventListener<string, this>): boolean;

    /**
     * Removes a listener from an event type.
     * @param type The type of the listener that gets removed.
     * @param listener The listener function that gets removed.
     */
    removeEventListener(type: string, listener: EventListener<string, this>): void;

    /**
     * Fire an event type.
     * @param event The event object that gets fired.
     */
    dispatchEvent(event: Event<string, this>): void;
}
