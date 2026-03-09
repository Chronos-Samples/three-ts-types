import { Camera, Group, Object3D, Raycaster, WebGLRenderer, XRTargetRaySpace } from "three";

export class InteractiveObject3D extends Object3D {}

export class InteractiveGroup extends Group {
    raycaster: Raycaster;

    listenToPointerEvents(renderer: WebGLRenderer, camera: Camera): void;

    disconnectionPointerEvents(): void;

    listenToXRControllerEvents(controller: XRTargetRaySpace): void;

    disconnectXrControllerEvents(): void;

    disconnect(): void;
}
