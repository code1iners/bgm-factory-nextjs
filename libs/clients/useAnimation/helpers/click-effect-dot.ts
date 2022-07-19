import {
  CreateDivProps,
  CreateDotContainerProps,
} from "@/libs/clients/useAnimation/types";

/**
 * Create dot container element.
 */
function createDotContainer({ x, y, degree, size }: CreateDotContainerProps) {
  const container = document.createElement("div");
  container.classList.add("dot-container");
  container.style.left = `${x - size / 2}px`;
  container.style.top = `${y - size / 2}px`;
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  container.style.transform = `rotate(${degree}deg)`;
  container.style.position = `absolute`;
  container.style.zIndex = "666";

  return container;
}

/**
 * Create dot wrapper element.
 */
function createDotWrapper({
  size,
  parent,
}: {
  size: number;
  parent: HTMLDivElement;
}) {
  const wrapper = document.createElement("div");
  wrapper.style.width = `${size}px`;
  wrapper.style.height = `${size}px`;
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";
  wrapper.style.alignItems = "center";
  wrapper.classList.add("dot-wrapper");
  wrapper.classList.add("animate-rotate-r");
  parent.appendChild(wrapper);
  return wrapper;
}

/**
 * Create dot element.
 */
function createDot({ parent }: { parent: HTMLDivElement }) {
  const dot = document.createElement("div");
  dot.style.width = "3px";
  dot.style.height = "3px";
  dot.style.backgroundColor = "rgb(99 102 241 / 1)";
  dot.style.transitionProperty =
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter";
  dot.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)";
  dot.style.transitionDuration = "150ms";
  dot.classList.add("dot");
  dot.classList.add("animate-straight-r");
  parent.appendChild(dot);
  return dot;
}

/**
 * Create single touch effect.
 */
function createTouchEffect({ x, y, degree }: CreateDivProps) {
  const containerSize = 80;

  // Create dot container.
  const dotContainer = createDotContainer({
    x,
    y,
    degree,
    size: containerSize,
  });

  // Create dot wrapper.
  const dotWrapper = createDotWrapper({
    size: containerSize,
    parent: dotContainer,
  });

  // Create dot.
  createDot({ parent: dotWrapper });

  document.body.appendChild(dotContainer);

  setTimeout(() => dotContainer.remove(), 200);
}

/**
 * Make touch animation effect.
 */
function makeTouchEffect({ clientX: x, clientY: y }: MouseEvent) {
  const degreeList = [90, 180, 270, 360];
  degreeList.forEach((degree) => {
    createTouchEffect({ x, y, degree });
  });
}

export default makeTouchEffect;
