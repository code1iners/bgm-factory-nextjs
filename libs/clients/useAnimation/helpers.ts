import { CreateDivProps } from "@/libs/clients/useAnimation/types";

const createDiv = ({ x, y, d }: CreateDivProps) => {
  const dotWrapperSize = 80;

  const dotContainer = document.createElement("div");
  dotContainer.style.left = `${x - dotWrapperSize / 2}px`;
  dotContainer.style.top = `${y - dotWrapperSize / 2}px`;
  dotContainer.classList.add("dot-container");
  dotContainer.style.transform = `rotate(${d}deg)`;

  const dotWrapper = document.createElement("div");
  dotWrapper.style.width = `${dotWrapperSize}px`;
  dotWrapper.style.height = `${dotWrapperSize}px`;
  dotWrapper.classList.add("dot-wrapper");
  dotWrapper.classList.add("animate-rotate-r");
  dotContainer.appendChild(dotWrapper);

  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.classList.add("animate-straight-r");
  dotWrapper.appendChild(dot);

  document.body.appendChild(dotContainer);

  setTimeout(() => dotContainer.remove(), 500);
};

/**
 * Make touch animation effect.
 */
export const makeTouchEffect = ({ clientX: x, clientY: y }: MouseEvent) => {
  const degreeList = [90, 180, 270, 360];
  degreeList.forEach((d) => {
    createDiv({
      x,
      y,
      d,
    });
  });
};
