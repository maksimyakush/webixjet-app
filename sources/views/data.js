import { JetView } from "webix-jet";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";

export default class DataView extends JetView {
	addItem(collection, form) {
		collection.add(form.getValues());
		form.clear();
	}

	getCustomDatatable(collection) {
		return {
			view: "datatable",
			editable: true,
			select: true,
			editaction: "dblclick",
			scroll: "y",
			onClick: {
				removeItem(e, id) {
					collection.remove(id);
					return false;
				}
			}
		};
	}

	config() {
		const headerData = {
			template: "Data",
			type: "header",
			css: "webix_header app_header"
		};

		const segmentedData = {
			view: "segmented",
			multiview: true,
			options: ["Countries", "Statuses"]
		};

		const countriesDatatable = {
			localId: "data:countriesDatatable",
			columns: [
				{
					id: "Short Name",
					value: "Short Name",
					adjust: true,
					editor: "text"
				},
				{
					id: "Full Name",
					value: "Full Name",
					fillspace: true,
					editor: "text"
				},
				{
					title: "Button",
					template: "<i class='webix_icon wxi-trash removeItem'></i>",
					width: 46
				}
			]
		};

		const statusesDatatable = {
			localId: "data:statusesDatatable",
			columns: [
				{ id: "name", value: "Name", adjust: true, editor: "text" },
				{
					id: "icon",
					value: "Icon",
					fillspace: true,
					editor: "text"
				},
				{
					title: "Button",
					template: "<i class='webix_icon wxi-trash removeItem'></i>",
					width: 46
				}
			]
		};

		webix.extend(countriesDatatable, this.getCustomDatatable(countries));
		webix.extend(statusesDatatable, this.getCustomDatatable(statuses));

		const countriesForm = {
			view: "form",
			localId: "data:countriesForm",
			elements: [
				{ view: "text", name: "Short Name", placeholder: "Short Name" },
				{ view: "text", name: "Full Name", placeholder: "Full Name" },
				{
					view: "button",
					value: "Add",
					click: () =>
						this.addItem(countries, this.$$("data:countriesForm"))
				}
			]
		};

		const statusesForm = {
			view: "form",
			localId: "data:statusesForm",
			elements: [
				{ view: "text", name: "name", placeholder: "Name" },
				{ view: "text", name: "icon", placeholder: "Icon" },
				{
					view: "button",
					value: "Add",
					click: () =>
						this.addItem(statuses, this.$$("data:statusesForm"))
				}
			]
		};

		const countriesCell = {
			id: "Countries",
			margin: 100,
			padding: 100,
			cols: [countriesDatatable, { rows: [countriesForm, {}] }]
		};

		const statusesCell = {
			id: "Statuses",
			margin: 100,
			padding: 100,
			cols: [statusesDatatable, { rows: [statusesForm, {}] }]
		};

		return {
			css: "webix_shadow_medium",
			type: "wide",
			rows: [
				headerData,
				segmentedData,
				{ cells: [countriesCell, statusesCell] }
			]
		};
	}
	init(view) {
		view.queryView({ localId: "data:countriesDatatable" }).parse(countries);
		view.queryView({ localId: "data:statusesDatatable" }).parse(statuses);
	}
}
