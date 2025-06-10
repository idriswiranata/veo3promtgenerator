import { VIDEO_STYLES, CAMERA_MOVEMENTS, LIGHTING_STYLES, VIDEO_MOODS, TIME_OF_DAY_OPTIONS } from './constants';

// Create union types from array values for strong typing
export type VideoStyleValue = typeof VIDEO_STYLES[number]['value'] | 'Kustom';
export type CameraMovementValue = typeof CAMERA_MOVEMENTS[number]['value'];
export type LightingStyleValue = typeof LIGHTING_STYLES[number]['value'];
export type VideoMoodValue = typeof VIDEO_MOODS[number]['value'];
export type TimeOfDayValue = typeof TIME_OF_DAY_OPTIONS[number]['value'];

export interface PromptElements {
  subject: string;
  action: string;
  expression: string;
  place: string;
  timeOfDay: TimeOfDayValue;
  cameraMovement: CameraMovementValue;
  lightingStyle: LightingStyleValue;
  videoStyle: VideoStyleValue;
  customVideoStyleText: string;
  videoMood: VideoMoodValue;
  soundMusic: string;
  spokenWords: string;
  additionalDetails: string;
}
