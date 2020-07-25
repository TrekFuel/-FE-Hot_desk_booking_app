import { PlaceData } from '../../../shared/modules/map-data.model';

export interface EditorBlock {
  name: string,
  urls: Array<{
    title: string,
    src: string
  }>,
}

export interface CanvasSize {
  width: number,
  height: number,
  zoom: number
}

export interface CurrentPlaceInEditor {
  isPlaceClickedToClose: boolean,
  isPlaceHovered: boolean,
  placeData: PlaceData | null,
}

export interface Confroom {
  default: number,
  min: number,
  max: number
}
