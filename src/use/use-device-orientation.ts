import {
  computed,
  type MaybeRefOrGetter,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watchEffect,
} from "vue";

import { scale } from "@/helpers/scale";

export enum OrientationKind {
  Device = "device",
  DeviceAbsolute = "device absolute",
  Mouse = "mouse",
}

export interface Orientation {
  alpha: number;
  beta: number;
  gamma: number;
  vertical: number;
  horizontal: number;
}

export const useDeviceOrientation = (
  kind: OrientationKind,
  screenOrientation: MaybeRefOrGetter<OrientationType>,
  elRef?: MaybeRefOrGetter<HTMLElement | SVGSVGElement | null>,
) => {
  const listening = ref(false);

  const orientation = ref<Orientation>();

  const alerted = ref(false);

  onMounted(() => {
    const handleMouseStuff = () => {
      const el = toValue(elRef)!;
      if (el == null) {
        throw new Error("Must pass in an element to handle mouse events");
      }

      const bounds = {
        width: el.clientWidth,
        height: el.clientHeight,
      };

      const handler = (e: Event) => {
        if (!(e instanceof MouseEvent)) {
          throw new Error("Invalid event handler for mouse orientation");
        }

        let y = bounds.height / 2;
        let x = bounds.width;
        switch (toValue(screenOrientation)) {
          case "portrait-primary":
            y = scale(e.offsetY, 0, bounds.height, 180, -180);
            x = scale(e.offsetX, 0, bounds.width, 90, -90);
            break;
          case "landscape-primary":
            y = scale(e.offsetY, 0, bounds.height, 180, -180);
            x = scale(e.offsetX, 0, bounds.width, 90, -90);
            break;
          default:
            break;
        }

        orientation.value = {
          alpha: 0,
          beta: e.offsetY,
          gamma: e.offsetX,
          vertical: y,
          horizontal: x,
        };
      };

      const handleClick = () => {
        listening.value = !listening.value;
      };

      el.addEventListener("click", handleClick);
      if (listening.value) {
        onBeforeUnmount(() => {
          el.removeEventListener("click", handleClick);
        });
      }

      watchEffect((onCleanup) => {
        if (listening.value) {
          el.addEventListener("mousemove", handler);
        } else {
          el.removeEventListener("mousemove", handler);
        }

        onCleanup(() => {
          el.removeEventListener("mousemove", handler);
        });
      });
    };

    const handleDeviceStuff = () => {
      const eventType =
        toValue(kind) === OrientationKind.Device
          ? "deviceorientation"
          : "deviceorientationabsolute";

      const handler = (e: DeviceOrientationEvent) => {
        if (e.alpha == null || e.beta == null || e.gamma == null) {
          return;
        }

        let vertical = 0;
        let horizontal = 0;
        switch (toValue(screenOrientation)) {
          case "portrait-primary":
            vertical = e.beta;
            horizontal = e.gamma;
            break;
          case "landscape-primary":
            vertical = -e.gamma;
            horizontal = e.beta;
            break;
          case "portrait-secondary":
            if (!alerted.value) {
              alert("TODO: portrait-secondary");
              alerted.value = true;
            }
            break;
          case "landscape-secondary":
            vertical = e.gamma;
            horizontal = -e.beta;
            break;
          default:
            break;
        }

        orientation.value = {
          alpha: e.alpha,
          beta: e.beta,
          gamma: e.gamma,
          vertical: vertical,
          horizontal: horizontal,
        };
      };

      watchEffect((onCleanup) => {
        if (listening.value) {
          window.addEventListener(eventType, handler);
        } else {
          window.removeEventListener(eventType, handler);
        }

        onCleanup(() => {
          window.removeEventListener(eventType, handler);
        });
      });
    };

    if (kind === OrientationKind.Mouse) {
      handleMouseStuff();
    } else {
      handleDeviceStuff();
    }
  });

  return {
    listening,
    reset: () => {
      orientation.value = undefined;
    },
    orientation: computed(() => orientation.value),
  };
};
