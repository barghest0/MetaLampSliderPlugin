import View from '../View/View';
import {
  Direction,
  Directions,
  SliderFillState,
  SliderParams,
} from '../types/slider';
import clearHTML from './PresenterModules/clearHTML';
import removeListeners from './PresenterModules/removeListeners';
import subscribe from './PresenterModules/subscribe';
import updateTipView from './PresenterModules/notifyViewMethods/updateTipView';
import updateFillView from './PresenterModules/notifyViewMethods/updateFillView';
import addListeners from './PresenterModules/addListeners';
import {
  FIRST_THUMB_STANCE,
  MAIN_CLASS,
  PARENT_CLASS,
  SECOND_THUMB_STANCE,
} from '../constants/slider';
import Model from '../Model/Model';
import updateThumbBeforeTrackClick from './PresenterModules/notifyModelMethods/updateThumbBeforeTrackClick';
import updateThumb from './PresenterModules/notifyModelMethods/updateThumb';
import updateFill from './PresenterModules/notifyModelMethods/updateFill';
import updateThumbView from './PresenterModules/notifyViewMethods/updateThumbView';
import unsubscribe from './PresenterModules/unsubscribe';

class Presenter {
  public root: string;

  public DOMroot: HTMLElement;

  public DOMparent: HTMLElement;

  public view: View;

  public model: Model;

  public params: SliderParams;

  public updateThumb: (
    stance: number,
    cursorOffset: number,
    direction: Direction,
  ) => void;

  public updateFill: (offset: number[]) => void;

  public updateThumbBeforeTrackClick: (
    cursorOffset: number,
    size: number,
  ) => void;

  public updateThumbView: (
    stance: number,
    value: number,
    offset: number,
  ) => void;

  public updateTipView: (stance: number, value: number, offset: number) => void;

  public updateFillView: (state: SliderFillState) => void;

  public clearHTML: (direction: Direction) => void;

  private removeListeners: () => void;

  private addListeners: (isRange: boolean) => void;

  private subscribe: () => void;

  private unsubscribe: () => void;

  constructor(root: string, params: SliderParams) {
    this.root = root;
    this.DOMroot = <HTMLElement>document.querySelector(root);
    this.DOMparent = <HTMLElement>this.DOMroot.parentElement;
    this.model = new Model(this.DOMroot);
    this.view = new View(this.DOMroot);
    this.params = params;
    this.clearHTML = clearHTML.bind(this);
    this.removeListeners = removeListeners.bind(this);
    this.subscribe = subscribe.bind(this);
    this.unsubscribe = unsubscribe.bind(this);
    this.updateThumbBeforeTrackClick = updateThumbBeforeTrackClick.bind(this);
    this.updateThumb = updateThumb.bind(this);
    this.updateFill = updateFill.bind(this);
    this.updateThumbView = updateThumbView.bind(this);
    this.updateTipView = updateTipView.bind(this);
    this.addListeners = addListeners.bind(this);
    this.updateFillView = updateFillView.bind(this);
  }

  public init(params: SliderParams) {
    this.addSliderClasses(params.direction);
    this.setModelState(params);
    this.setViewState();
    this.setSubViewsState();
    this.renderSlider(params);

    this.subscribe();
    this.addListeners(params.isRange);
  }

  public renderSlider({
    direction,
    step,
    max,
    min,
    value,
    hasFill,
    hasScale,
    hasTips,
  }: SliderParams) {
    this.renderTrack(direction);
    this.renderScale(direction, step, max, min, hasScale);
    this.renderFill(direction, hasFill);
    value.forEach((_, stance) => {
      this.renderThumb(stance);
      this.renderTip(direction, stance, hasTips);
    });
  }

  public setModelState(params: SliderParams) {
    this.model.setParams(params);
    const size =
      params.direction === Directions.horizontal
        ? this.DOMroot.offsetWidth
        : this.DOMroot.offsetHeight;
    this.model.setSize(size);
    params.value.forEach((_, index) => {
      this.model.setOffset(index, this.model.calculateOffset(index));
    });
    this.model.setFillState(this.model.calculateFillState());

    return this;
  }

  public setViewState() {
    this.view.setParams(this.model.getParams());
    this.view.setSize(this.model.getSize());
    this.view.prepareDirectionForInteraction(this.model.getParams().direction);
    return this;
  }

  private setSubViewsState() {
    const { isDecimal, decimalPlaces } = this.model.getParams();
    const offset = this.model.getOffset();
    const value = this.model.getValue();
    const fillState = this.model.getFillState();
    value.forEach((_, index) => {
      this.setThumbViewState(offset[index], value[index], index);
      this.setTipViewState(
        offset[index],
        value[index],
        index,
        isDecimal,
        decimalPlaces,
      );
    });
    this.setFillViewState(fillState);
  }

  private setThumbViewState(offset: number, value: number, stance: number) {
    this.view.thumbView.setOffset(offset, stance);
    this.view.thumbView.setValue(value, stance);
  }

  private setFillViewState({ fillSize, fillOffset }: SliderFillState) {
    this.view.fillView.setOffset(fillOffset);
    this.view.fillView.setSize(fillSize);
  }

  private setTipViewState(
    offset: number,
    value: number,
    stance: number,
    isDecimal: boolean,
    decimalPlaces: number,
  ) {
    this.view.tipView.setOffset(offset, stance);
    this.view.tipView.setValue(value, stance);
    this.view.tipView.setIsDecimal(isDecimal);
    this.view.tipView.setDecimalPlaces(decimalPlaces);
  }

  private addSliderClasses(direction: Direction) {
    this.DOMroot.classList.add(`${MAIN_CLASS}_${direction}`);
    this.DOMparent.classList.add(`${PARENT_CLASS}_${direction}`);
  }

  private renderTrack(direction: Direction) {
    this.view.trackView.createTrack(direction);
  }

  private renderThumb(stance: number) {
    this.view.thumbView.createThumb(stance);
  }

  private renderTip(direction: Direction, stance: number, hasTips: boolean) {
    this.view.tipView.createTip(direction, stance, hasTips);
  }

  private renderFill(direction: Direction, hasFill: boolean) {
    this.view.fillView.createFill(direction, hasFill);
  }

  private renderScale(
    direction: Direction,
    step: number,
    max: number,
    min: number,
    hasScale: boolean,
  ) {
    this.view.scaleView.createScale(direction, hasScale);
    this.view.scaleView.createScaleMarks(step, max, min, direction);
  }
}

export default Presenter;
