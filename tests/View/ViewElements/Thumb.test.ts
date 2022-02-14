import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import View from '../../../src/View/View';
import Thumb from '../../../src/View/ViewElements/Thumb/Thumb';

import { SubscribersNames } from '../../../src/utils/interfaces';
import {
  FIRST_OFFSET,
  FIRST_THUMB_STANCE,
  FIRST_VALUE,
  SECOND_OFFSET,
  SECOND_THUMB_STANCE,
  SECOND_VALUE,
} from '../../../src/utils/constants';
import Model from '../../../src/Model/Model';

describe('Thumb test', () => {
  document.body.innerHTML =
    '<div id="slider-1" data-testid="slider-1" class="slider-1"></div>';
  const rootClass = '.slider-1';
  const root = <HTMLElement>document.querySelector(rootClass);
  const view = new View(root);
  const thumb = new Thumb(view);
  const model = new Model(root);
  thumb.createThumb(FIRST_THUMB_STANCE);
  thumb.createThumb(SECOND_THUMB_STANCE);

  test('constructor test', () => {
    expect(thumb).toHaveProperty('view');
  });

  test('correct append thumb to DOM test', () => {
    const DOMThumb = screen.getByTestId('test-thumb-0');
    expect(DOMThumb).toBeInTheDocument();
  });

  test('setValue test', () => {
    thumb.setValue(100, FIRST_THUMB_STANCE);
    expect(thumb.getValue()[FIRST_VALUE]).toBe(100);
    thumb.setValue(150, SECOND_THUMB_STANCE);
    expect(thumb.getValue()[SECOND_VALUE]).toBe(150);
  });

  test('setOffset test', () => {
    thumb.setOffset(50, FIRST_THUMB_STANCE);
    expect(thumb.getOffset()[FIRST_OFFSET]).toBe(50);
    thumb.setOffset(60, SECOND_THUMB_STANCE);
    expect(thumb.getOffset()[SECOND_OFFSET]).toBe(60);
  });

  test('correct validate collision', () => {
    thumb.setValue(150, FIRST_THUMB_STANCE);
    thumb.setValue(100, SECOND_THUMB_STANCE);
    expect(thumb.validateCollision(0)).toBe(1);
    thumb.setValue(90, FIRST_THUMB_STANCE);
    expect(thumb.validateCollision(0)).toBe(0);
    thumb.setValue(80, SECOND_THUMB_STANCE);
    expect(thumb.validateCollision(1)).toBe(0);
  });

  test('correct notify before drag thumb test', () => {
    const fn = jest.fn();
    thumb.dragAndDropThumb(FIRST_THUMB_STANCE);
    thumb.subscribe(SubscribersNames.updateThumb, fn);
    thumb.subscribe(SubscribersNames.updateFill, fn);
    model.subscribe(SubscribersNames.updateValues, fn);
    model.subscribe(SubscribersNames.updateThumbView, fn);
    model.subscribe(SubscribersNames.updateTipView, fn);
    model.subscribe(SubscribersNames.updateFillView, fn);
    const notify = jest.spyOn(thumb, 'notify');

    const DOMThumb = screen.getByTestId('test-thumb-0');
    DOMThumb.dispatchEvent(new Event('pointerdown'));
    document.dispatchEvent(new Event('pointermove'));
    expect(notify).toBeCalled();
  });

  test('correct handle drag test', () => {
    thumb.dragAndDropThumb(FIRST_THUMB_STANCE);
    view.params.isRange = true;
    const validateCollision = jest.spyOn(thumb, 'validateCollision');
    const DOMThumb = screen.getByTestId('test-thumb-0');
    DOMThumb.dispatchEvent(new Event('pointerdown'));
    document.dispatchEvent(new Event('pointermove'));
    expect(validateCollision).toBeCalled();
  });
});
