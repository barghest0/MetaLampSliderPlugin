import View from '../../../src/View/View';
import Track from '../../../src/View/SubViews/Track/Track';
import {
  Directions,
  Params,
  SubscribersNames,
} from '../../../src/types/slider';

describe('Track test', () => {
  document.body.innerHTML =
    '<div id="slider-1" data-testid="slider-1" class="slider-1"></div>';
  const rootClass = '.slider-1';
  const root = <HTMLElement>document.querySelector(rootClass);
  const view = new View(root);
  const track = new Track(view);
  track.createTrack(Directions.horizontal);
  track.clickTrack();

  test('is DOM track instance of HTMLElement test', () => {
    expect(track.track).toBeInstanceOf(HTMLElement);
  });

  test('expect notify model after click track in horizontal/vertical direction', () => {
    const subscriberFn = jest.fn();
    jest.spyOn(track, 'notify');
    track.subscribe(SubscribersNames.updateThumbAfterTrackClick, subscriberFn);
    track.subscribe(SubscribersNames.updateFill, subscriberFn);

    view.setParam(Params.direction, Directions.horizontal);
    root.dispatchEvent(new MouseEvent('pointerdown'));
    expect(track.notify).toBeCalled();

    view.setParam(Params.direction, Directions.vertical);
    root.dispatchEvent(new MouseEvent('pointerdown'));
    expect(track.notify).toBeCalled();
  });
});
