import { ElementData } from '../types/element';
import { ELEMENTS_PART_1 } from './elementsPart1';
import { ELEMENTS_PART_2 } from './elementsPart2';
import { ELEMENTS_PART_3 } from './elementsPart3';

export const ALL_ELEMENTS: ElementData[] = [
  ...ELEMENTS_PART_1,
  ...ELEMENTS_PART_2,
  ...ELEMENTS_PART_3,
].sort((a, b) => a.number - b.number);
