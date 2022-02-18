import { Directions, SubscribersNames } from '../../../../types/slider';
import Track from '../Track';

function handleTrackClick(event: PointerEvent, thisTrack: Track) {
  const { direction } = thisTrack.view.params;
  const coordinate =
    direction === Directions.horizontal ? event.pageX : event.pageY;
  const cursorOffset = thisTrack.view.calculateCursorOffset(
    coordinate,
    direction,
    thisTrack.view.DOMroot,
    thisTrack.view.size,
  );
  thisTrack.notify(SubscribersNames.updateThumbAfterTrackClick, cursorOffset);
  thisTrack.notify(SubscribersNames.updateFill);
}

export default handleTrackClick;