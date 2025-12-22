/**
 * The minimal basic Event that can be dispatched by a {@link EventDispatcher<>}.
 */
export interface BaseEvent<TEventType extends string = string> {
    readonly type: TEventType;
}

/**
 * The minimal expected contract of a fired Event that was dispatched by a {@link EventDispatcher<>}.
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

export type EventListener<TEventData, TEventType extends string, TTarget> = (
    event: TEventData & Event<TEventType, TTarget>,
) => void;

/**
 * JavaScript events for custom objects
 *
 * @source src/core/EventDispatcher.js
 */
export class EventDispatcher<TEventMap extends {} = {}> {
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
    addEventListener<T extends Extract<keyof TEventMap, string>>(
        type: T,
        listener: EventListener<TEventMap[T], T, this>,
        options?: EventListenerOptions,
    ): void;

    /**
     * Checks if listener is added to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    hasEventListener<T extends Extract<keyof TEventMap, string>>(
        type: T,
        listener: EventListener<TEventMap[T], T, this>,
    ): boolean;

    /**
     * Removes a listener from an event type.
     * @param type The type of the listener that gets removed.
     * @param listener The listener function that gets removed.
     */
    removeEventListener<T extends Extract<keyof TEventMap, string>>(
        type: T,
        listener: EventListener<TEventMap[T], T, this>,
    ): void;

    /**
     * Fire an event type.
     * @param event The event object that gets fired.
     */
    dispatchEvent<T extends Extract<keyof TEventMap, string>>(event: Event<T>): void;
}
