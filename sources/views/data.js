import { JetView } from "webix-jet";
import CommonData from "./commondata";
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
			options: ["Countries", "Statuses"],
			on: {
				onAfterTabClick() {}
			}
		};

		const countriesCell = {
			id: "Countries",
			margin: 100,
			padding: 100,
			cols: [
				{
					localId: "data:countries",
					$subview: new CommonData(this.app, "", countries, [
						"Short Name",
						"Full Name"
					])
				}
			]
		};

		const statusesCell = {
			id: "Statuses",
			margin: 100,
			padding: 100,
			cols: [
				{
					localId: "data:statuses",
					$subview: new CommonData(this.app, "", statuses, ["name", "icon"])
				}
			]
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
}
