import { Direction } from "../../Interfaces/interfaces";
import View from "../View";
import updateThumbPosition from '../ViewElements/Thumb/utils/updateThumbPosition';

const initialThumbPlacement = function (
	this: View,
	offset: number,
	stance: number
) {
	this.thumbView.updateThumbPosition(offset, stance);
};

export default initialThumbPlacement;
