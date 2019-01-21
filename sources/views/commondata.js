import { JetView } from "webix-jet";

export default class CommonDataView extends JetView {
	constructor(app, name, data, columns) {
		super(app, name);
		this._tdata = data;
		this.columns = columns;
	}

	getColumns() {
		const _ = this.app.getService("locale")._;

		return this.columns
			.map((name, i) => ({
				id: name,
				header: _(name),
				editor: "text",
				fillspace: i + 1
			}))
			.concat({ template: "{common.trashIcon()}", adjust: true });
	}

	getTextViews() {
		const _ = this.app.getService("locale")._;

		return this.columns.map(name => {
			return { view: "text", name, placeholder: _(name) };
		});
	}

	config() {
		const _ = this.app.getService("locale")._;

		const datatable = {
			view: "datatable",
			localId: "datatable",
			select: true,
			editable: true,
			editaction: "dblclick",
			scroll: "y",
			columns: this.getColumns(),
			onClick: {
				"wxi-trash": (e, id) => {
					this._tdata.remove(id);
					return false;
				}
			}
		};
		const form = {
			view: "form",
			elements: [
				...this.getTextViews(),
				{
					view: "button",
					value: _("Add"),
					click() {
						this.$scope._tdata.add(this.getFormView().getValues());
						this.getFormView().clear();
					}
				}
			]
		};

		return { rows: [datatable, form] };
	}
	init() {
		this.$$("datatable").sync(this._tdata);
	}
}
