import { SugarCubeStoryVariables } from 'twine-sugarcube';

export interface CustomStoryVariables extends SugarCubeStoryVariables {
   [key: string]: unknown;
}