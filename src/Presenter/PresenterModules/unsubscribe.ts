import { SubscribersNames } from '../../types/slider';
import Presenter from '../Presenter';

function unsubscribe(this: Presenter) {
  this.view.thumbView.unsubscribe(SubscribersNames.updateThumb, this.updateThumb);
  this.view.thumbView.unsubscribe(SubscribersNames.updateFill, this.updateFill);
  this.view.trackView.unsubscribe(
    SubscribersNames.updateThumbAfterTrackClick,
    this.updateThumbAfterTrackClick,
  );
  this.view.trackView.unsubscribe(SubscribersNames.updateFill, this.updateFill);
  this.model.unsubscribe(SubscribersNames.updateThumbView, this.updateThumbView);
  this.model.unsubscribe(SubscribersNames.updateFillView, this.updateFillView);

  if (this.model.getParams().hasTips) {
    this.model.unsubscribe(SubscribersNames.updateThumbView, this.updateTipView);
  }
  if (this.model.getParams().panel) {
    this.view.panelView.unsubscribe(
      SubscribersNames.updateParams,
      this.updateModelParams,
    );
    this.model.unsubscribe(SubscribersNames.updateParams, this.updateViewParams);
    this.model.unsubscribe(
      SubscribersNames.updatePanelValues,
      this.updatePanelValuesAfterThumbDrag,
    );
  }
}

export default unsubscribe;
