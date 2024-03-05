/**
 * The minimal basic Event that can be dispatched by a {@link EventDispatcher<>}.
 */
export interface BaseEvent<TEventType extends string = string> {
    readonly type: TEventType;
}

/**
 * Event object.
 */
export class Event<TEventType extends string = string, TTarget = unknown> implements BaseEvent {
    /**
     * Creates event object.
     **/
    constructor(eventData: { type: TEventType } & { [prop: string]: any }, options?: EventOptions);

    readonly type: TEventType;
    readonly target: TTarget;
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
     * Creates eventDispatcher object. It needs to be call with '.call' to add the functionality to an object.
     */
    constructor();

    /**
     * Adds a listener to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     * @param options Additional settings for event listener.
     */
    addEventListener<T extends string>(
      type: T,
      listener: EventListener<any, T, this>,
      options?: EventListenerOptions,
    ): void;

    /**
     * Checks if listener is added to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    hasEventListener<T extends string>(type: T, listener: EventListener<any, T, this>): boolean;

    /**
     * Removes a listener from an event type.
     * @param type The type of the listener that gets removed.
     * @param listener The listener function that gets removed.
     */
    removeEventListener<T extends string>(type: T, listener: EventListener<any, T, this>): void;

    /**
     * Fire an event type.
     * @param event The event object that gets fired.
     */
    dispatchEvent<T extends string>(event: BaseEvent<T> & any): void;
}
