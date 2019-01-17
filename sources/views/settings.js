import { JetView } from "webix-jet";

export default class ContactsView extends JetView {
	config() {
		const headerData = {
			template: "Settings",
			type: "header",
			css: "webix_header app_header"
		};

		const segmentedData = {
			view: "segmented",
			multiview: true,
			options: ["RU", "EN"]
		};

		return {
			css: "webix_shadow_medium",
			rows: [
				headerData,
				segmentedData,
				{
					cells: [
						{ id: "RU", template: "RU" },
						{ id: "EN", template: "EN" }
					]
				}
			]
		};
	}
}