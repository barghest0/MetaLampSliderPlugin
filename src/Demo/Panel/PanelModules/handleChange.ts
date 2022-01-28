import checkParams from '../../../Presenter/PresenterModules/checkParams';
import Panel from '../Panel';

const handleChange = function (this: Panel, e: Event, param: string | number, valueIndex?: number) {
  const target = e.target! as HTMLInputElement;
  const { value } = target;

  if (param === 'value') this.params[param][valueIndex!] = +value;
  else if (param === 'direction') this.params[param] = target.checked ? 'vertical' : 'horizontal';
  else this.params[param] = value ? +value : target.checked;

  this.parent.init(checkParams(this.params), 'rebuild');
  this.parent.panel.initializeFormValues(checkParams(this.params));
};
export default handleChange;