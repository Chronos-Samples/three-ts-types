import * as THREE from "three";

const dispatcher = new THREE.EventDispatcher();

dispatcher.addEventListener("eventA", e => {
    e.type; // $ExpectType string
    e.target; // $ExpectType EventDispatcher
    e.foo; // $ExpectType any
});

dispatcher.addEventListener("any-event-name", e => {
    e.type; // $ExpectType string
    e.target; // $ExpectType EventDispatcher
    e.payload; // $ExpectType any
});

dispatcher.dispatchEvent(new THREE.Event({ type: "eventA" }));
dispatcher.dispatchEvent(new THREE.Event({ type: "eventB", otherProp: 42 }));
dispatcher.dispatchEvent(new THREE.Event({ type: "finished", direction: -1, action: {} as THREE.AnimationAction }));

// @ts-expect-error
dispatcher.dispatchEvent({ type: "eventA" });

dispatcher.removeEventListener("eventA", e => {
    e.type; // $ExpectType string
    e.target; // $ExpectType EventDispatcher
});

dispatcher.hasEventListener("eventA", e => {
    e.type; // $ExpectType string
    e.target; // $ExpectType EventDispatcher
});

// @ts-expect-error
new THREE.EventDispatcher<Record<string, { foo: number }>>();

// @ts-expect-error
new THREE.Object3D<Record<string, { foo: number }>>();

// @ts-expect-error
new THREE.Group<Record<string, { foo: number }>>();

// @ts-expect-error
dispatcher.dispatchEvent({ otherProp: 42 });
