import { JetView } from "webix-jet";
import { countries } from "models/countries";
import { statuses } from "models/statuses";
import CommonData from "views/commondata";

export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const headerData = {
			template: "Data",
			type: "header",
			css: "webix_header app_header"
		};

		const segmentedData = {
			view: "segmented",
			multiview: true,
			options: [_("Countries"), _("Statuses")]
		};

		const countriesCell = {
			id: _("Countries"),
			margin: 100,
			padding: 100,
			cols: [
				{
					localId: "data:countries",
					$subview: new CommonData(this.app, "", countries, ["Name"])
				}
			]
		};

		const statusesCell = {
			id: _("Statuses"),
			margin: 100,
			padding: 100,
			cols: [
				{
					localId: "data:statuses",
					$subview: new CommonData(this.app, "", statuses, ["Name", "Icon"])
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
