import View from "../../../src/View/View";
import Fill from "../../../src/View/ViewElements/Fill/Fill";
import { screen, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom'

describe("Fill test", () => {
	document.body.innerHTML = `<div id="slider-1" class="slider-1"></div>`;
	const root = ".slider-1";
	const view = new View(root);
	const thumb = view.thumbView;
	const fill = new Fill(view);
	
	fill.createFill('horizontal', true);

		
	
	test("constructor test", () => {
		expect(view.root).toBe(root);
	});
	test("setSize test", () => {
		fill.setSize(100);
		expect(fill).toHaveProperty("size", 100);
	});

	test("setOffset test", () => {
		fill.setOffset(100);
		expect(fill).toHaveProperty("offset", 100);
	});

	test("correct updateFill with single thumb test", async () => {
		waitFor(() => {
			try{
				thumb.setOffset(50, 0);
				fill.updateFill('horizontal');
				const DOMFill = screen.getByTestId('test-fill');
				expect(DOMFill).toHaveStyle('width:50%');
			}catch(e){
				console.log(e);
			}
		});
	});

	test("correct updateFill with range  test", async () => {
		
		waitFor(() => {
			try{
				view.isRange = true;
				thumb.setOffset(50, 0);
				thumb.setOffset(100, 1);
				fill.updateFill('horizontal');
				const DOMFill = screen.getByTestId('test-fill');
				expect(DOMFill).toHaveStyle('width:50%');
			}catch (e) {
				console.log(e);
			}
			
		});
	});


	test("correct initial fill placement test", async () => {
		waitFor(() => {
			try{
				view.thumbView.setOffset(10, 0);
				view.initialFillPlacement('horizontal');
				const DOMFill = screen.getByTestId('test-fill');
				expect(DOMFill).toHaveStyle('width:10%');
			}catch(e){
				console.log(e);
			}
			
		});
		
		waitFor(() => {
			try{
				view.thumbView.setOffset(50, 1);
				view.initialFillPlacement('horizontal');
				const DOMFill = screen.getByTestId('test-fill');
				expect(DOMFill).toHaveStyle('width:40%');
			}catch(e){
				console.log(e);
			}
		});
	});

});
