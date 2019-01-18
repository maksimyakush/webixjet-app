import { JetView } from "webix-jet";

export default class CommonData extends JetView {
	constructor(app, name, data, columns) {
		super(app, name);
		this._tdata = data;
		this.columns = columns;
	}

	getColumnsData() {
		return this.columns
			.map((name, i) => ({
				id: name,
				header: name,
				fillspace: i
			}))
			.concat({ template: "{common.trashIcon()}" });
	}

	getTextViews() {
		return this.columns.map(name => {
			return { view: "text", name, placeholder: name };
		}, []);
	}

	config() {
		return {
			rows: [
				{
					view: "datatable",
					editable: true,
					select: true,
					editaction: "dblclick",
					scroll: "y",
					columns: this.getColumnsData(),
					onClick: {
						"wxi-trash"(e, id) {
							this.remove(id);
							return false;
						}
					},
					on: {
						onAfterSelect(id) {
							const form = this.$scope.getRoot().queryView("form");
							form.setValues(this.getItem(id));
						}
					}
				},
				{
					view: "form",
					elements: [
						...this.getTextViews(),
						{
							view: "button",
							value: "Save",
							click: () => {
								const form = this.getRoot().queryView("form");
								const grid = this.getRoot().queryView("datatable");
								if (!form.getValues().id) {
									grid.add(form.getValues());
								} else {
									grid.updateItem(form.getValues().id, form.getValues());
								}
								form.clear();
								grid.unselectAll();
							}
						}
					]
				}
			]
		};
	}

	init(view) {
		view.queryView("datatable").parse(this._tdata);
	}
}
