export interface MakeRotateEffectProps {
  x: number;
  y: number;
  dotColor?: string;
}

export interface CreateTouchEffectProps {
  x: any;
  y: any;
  degree: number;
  dotColor?: string;
}

export interface CreateDotContainerProps {
  x: number;
  y: number;
  size: number;
  degree: number;
}
export interface CreateDotWrapperProps {
  size: number;
  parent: HTMLDivElement;
}

export interface CreateDotProps {
  dotColor?: string;
  parent: HTMLDivElement;
}
