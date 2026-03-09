import { Camera, ColorRepresentation, Controls, Mesh, Object3D, Quaternion, Raycaster, Vector3 } from "three";

export type TransformControlsMode = "translate" | "rotate" | "scale";

/**
 * This class can be used to transform objects in 3D space by adapting a similar interaction model of DCC tools like
 * Blender. Unlike other controls, it is not intended to transform the scene's camera.
 *
 * TransformControls expects that its attached 3D object is part of the scene graph.
 */
declare class TransformControls extends Controls {
    /**
     * The camera of the rendered scene.
     */
    camera: Camera;

    /**
     * The current transformation axis.
     */
    axis: "X" | "Y" | "Z" | "E" | "XY" | "YZ" | "XZ" | "XYZ" | "XYZE" | null;

    /**
     * The current transformation mode. Possible values are "translate", "rotate" and "scale". Default is `translate`.
     */
    mode: TransformControlsMode;

    /**
     * By default, 3D objects are continuously translated. If you set this property to a numeric value (world units),
     * you can define in which steps the 3D object should be translated. Default is `null`.
     */
    translationSnap: number | null;

    /**
     * By default, 3D objects are continuously rotated. If you set this property to a numeric value (radians), you can
     * define in which steps the 3D object should be rotated. Default is `null`.
     */
    rotationSnap: number | null;

    /**
     * By default, 3D objects are continuously scaled. If you set this property to a numeric value, you can define in
     * which steps the 3D object should be scaled. Default is `null`.
     */
    scaleSnap: number | null;

    /**
     * Defines in which coordinate space transformations should be performed. Possible values are "world" and "local".
     * Default is `world`.
     */
    space: "world" | "local";

    /**
     * The size of the helper UI (axes/planes). Default is *1*.
     */
    size: number;

    /**
     * Whether or not dragging is currently performed. Read-only property.
     */
    dragging: boolean;

    /**
     * Whether or not the x-axis helper should be visible. Default is `true`.
     */
    showX: boolean;

    /**
     * Whether or not the y-axis helper should be visible. Default is `true`.
     */
    showY: boolean;

    /**
     * Whether or not the z-axis helper should be visible. Default is `true`.
     */
    showZ: boolean;

    /**
     * The minimum allowed X position during translation. Default is `-Infinity`.
     */
    minx: number;

    /**
     * The maximum allowed X position during translation. Default is `Infinity`.
     */
    maxX: number;

    /**
     * The minimum allowed Y position during translation. Default is `-Infinity`.
     */
    minY: number;

    /**
     * The maximum allowed Y position during translation. Default is `Infinity`.
     */
    maxY: number;

    /**
     * The minimum allowed Z position during translation. Default is `-Infinity`.
     */
    minZ: number;

    /**
     * The maximum allowed Z position during translation. Default is `Infinity`.
     */
    maxZ: number;

    /**
     * Creates a new instance of TransformControls.
     * @param camera The camera of the rendered scene.
     * @param domElement The HTML element used for event listeners. (optional)
     */
    constructor(camera: Camera, domElement?: HTMLElement | SVGElement | null);

    /**
     * Returns the visual representation of the controls. Add the helper to your scene to visually transform the
     * attached 3D object.
     */
    getHelper(): TransformControlsRoot;

    pointerHover(pointer: PointerEvent | null): void;
    pointerDown(pointer: PointerEvent | null): void;
    pointerMove(pointer: PointerEvent | null): void;
    pointerUp(pointer: PointerEvent | null): void;

    /**
     * Sets the 3D object that should be transformed and ensures the controls UI is visible.
     * @param object The 3D object that should be transformed.
     */
    attach(object: Object3D): this;

    /**
     * Removes the current 3D object from the controls and makes the helper UI invisible.
     */
    detach(): this;

    /**
     * Resets the object's position, rotation and scale to when the current transform began.
     */
    reset(): void;

    /**
     * Returns the {@link Raycaster} object that is used for user interaction. This object is shared between all
     * instances of TransformControls. If you set the [.layers]{@link Object3D.layers} property of the
     * TransformControls, you will also want to set the [.layers]{@link Raycaster.layers} property on the
     * {@link Raycaster} with a matching value, or else the TransformControls won't work as expected.
     */
    getRaycaster(): Raycaster;

    /**
     * Returns the transformation mode.
     */
    getMode(): TransformControlsMode;

    /**
     * Sets the transformation mode.
     * @param mode The transformation mode.
     */
    setMode(mode: TransformControlsMode): void;

    /**
     * Sets the translation snap.
     * @param translationSnap The translation snap.
     */
    setTranslationSnap(translationSnap: number | null): void;

    /**
     * Sets the rotation snap.
     * @param rotationSnap The rotation snap.
     */
    setRotationSnap(rotationSnap: number | null): void;

    /**
     * Sets the scale snap.
     * @param scaleSnap The scale snap.
     */
    setScaleSnap(scaleSnap: number | null): void;

    /**
     * Sets the size of the helper UI.
     * @param size The size of the helper UI.
     */
    setSize(size: number): void;

    /**
     * Sets the coordinate space in which transformations are applied.
     * @param space The coordinate space in which transformations are applied.
     */
    setSpace(space: "world" | "local"): void;

    /**
     * Sets the colors of the control's gizmo.
     *
     * @param {number|Color|string} xAxis - The x-axis color.
     * @param {number|Color|string} yAxis - The y-axis color.
     * @param {number|Color|string} zAxis - The z-axis color.
     * @param {number|Color|string} active - The color for active elements.
     */
    setColors(
        xAxis: ColorRepresentation,
        yAxis: ColorRepresentation,
        zAxis: ColorRepresentation,
        active: ColorRepresentation,
    ): void;
}

declare class TransformControlsRoot extends Object3D {
    readonly isTransformControlsRoot: true;

    controls: TransformControls;

    constructor(controls: TransformControls);

    dispose(): void;
}

declare class TransformControlsGizmo extends Object3D {
    isTransformControlsGizmo: true;

    gizmo: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };
    helper: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };
    picker: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };

    constructor();
}

declare class TransformControlsPlane extends Mesh {
    readonly isTransformControlsPlane: true;

    constructor();

    mode: TransformControlsMode;

    axis: "X" | "Y" | "Z" | "XY" | "YZ" | "XZ" | "XYZ" | "E";

    space: "local" | "world";

    eye: Vector3;
    worldPosition: Vector3;
    worldQuaternion: Quaternion;
}

export { TransformControls, TransformControlsGizmo, TransformControlsPlane };
