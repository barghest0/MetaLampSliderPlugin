function validateStep(step: number,min:number,max:number) {
	let validatedStep =  Math.min(Math.abs(min-max), step)
	if (validatedStep === 0) validatedStep = 1
	
	return validatedStep;
}

export default validateStep;