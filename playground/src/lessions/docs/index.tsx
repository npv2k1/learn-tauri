import { LessionsEnum } from '../configs/constants';
import learnUseState from './learn-use-state.md';
import LearnUseEffect from './learn-use-effect.md';
export const lessionsDocs: {
  [key in LessionsEnum]: any;
} = {
  [LessionsEnum.LEARN_USE_STATE]: learnUseState,
  [LessionsEnum.LEARN_USE_EFFECT]: LearnUseEffect,
};
