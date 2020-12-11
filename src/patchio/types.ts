export interface PatchioProps {
  className?: string,
}

export enum PatchioInputType {
  Number = 'NUMBER',
  String = 'STRING',
  Boolean = 'BOOLEAN',
  Image = 'IMAGE'
}

export interface PatchioInput {
  name: string,
  type: PatchioInputType,
  field: boolean,
  slot: boolean,
  options?: Array<string>,
}

export interface PatchClasses {
  [id: string]: {
    name: string,
    inputs?: Array<PatchioInput>,
  },
}

export interface PatchData {
  [id: string]: {
    patchClass: string,
    x: number,
    y: number,
  },
}
