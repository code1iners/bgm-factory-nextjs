export interface CreateDivProps {
  x: any;
  y: any;
  degree: number;
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
