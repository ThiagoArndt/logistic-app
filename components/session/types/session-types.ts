import { StaticImageData } from "next/image";

//Session Interface
export interface SessionInterface {
  //Functions
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  navigationHandler: () => void;

  //DataTypes
  info: SessionInfoInterface;

  //Props
  children?: React.ReactNode;
}

export interface SessionInfoInterface {
  title: string;
  subtitle: string;
  btnTitle: string;
  firstPartDesc: string;
  secondPartDesc: string;
  image: StaticImageData;
}

export interface SessionInputInterface {
  ref: React.ForwardedRef<HTMLInputElement | undefined | null>;
  icon: JSX.Element;
  placeHolder: string;
}
