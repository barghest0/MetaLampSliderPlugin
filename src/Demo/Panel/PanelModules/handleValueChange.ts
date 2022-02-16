import validateParams from '../../../Presenter/PresenterModules/validateParams';
import { InitMods } from '../../../@types/slider';
import Panel from '../Panel';

function handleValueChange(this: Panel, event: Event, valueIndex: number) {
  const target = <HTMLInputElement>event.target;
  const { value } = target;

  this.params.value[valueIndex] = +value;
  this.parent.init(validateParams(this.params, this.DOMroot), InitMods.rebuild);
  this.parent.panel.initializeFormValues(
    validateParams(this.params, this.DOMroot),
  );
}

export default handleValueChange;