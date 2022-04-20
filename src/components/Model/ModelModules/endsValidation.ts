import Model from '../Model';

import { MAX_OFFSET, MIN_OFFSET } from '../../Slider/constants';
import { Directions } from '../../Slider/types';

function endsValidation(this: Model, stance: number) {
  const { min, max, direction } = this.getParams();
  if (this.getOffset()[stance] > MAX_OFFSET) {
    this.setOffset(stance, MAX_OFFSET);
    this.setValue(stance, direction === Directions.horizontal ? max : min);
  }
  if (this.getOffset()[stance] < MIN_OFFSET) {
    this.setOffset(stance, MIN_OFFSET);
    this.setValue(stance, direction === Directions.horizontal ? min : max);
  }
}

export default endsValidation;