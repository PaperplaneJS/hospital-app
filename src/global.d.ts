/// <reference types="react-scripts" />

type RC = ReturnType<React.FC>

type IProps = {
  style: React.CSSProperties
  className: any
}

type TypeofArray<T extends any[]> = T extends (infer U)[] ? U : never
