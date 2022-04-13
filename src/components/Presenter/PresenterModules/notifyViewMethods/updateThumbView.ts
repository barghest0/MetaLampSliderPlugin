import Presenter from '../../Presenter';

function updateThumbView(this: Presenter) {
  const stance = this.model.getActiveStance();
  const offset = this.model.getOffset()[stance];
  this.view.thumbView.setOffset(stance, offset);
  this.view.thumbView.updateThumbStyle(stance);
  this.view.thumbView.setActiveStance(stance);
}

export default updateThumbView;