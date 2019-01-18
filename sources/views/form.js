import { JetView, JetApp, plugins } from "webix-jet";
import { contacts } from "../models/contacts";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";

export default class Form extends JetView {
	constructor(app, name) {
		super(app, name);
	}

	config() {
		const _ = this.app.getService("locale")._;

		let countriesArr = [];
		countries.data.each(item => {
			countriesArr.push(item["Full Name"]);
		});

		let statusesArr = [];
		statuses.data.each(item => {
			statusesArr.push(item["name"]);
		});

		return {
			view: "form",
			localId: "form",
			autoheight: false,
			paddingX: 20,
			elements: [
				{
					view: "text",
					label: _("User Name"),
					name: "name"
				},
				{
					view: "text",
					label: _("Email"),
					name: "email"
				},
				{
					view: "combo",
					label: _("Countries"),
					options: countriesArr
				},
				{
					view: "combo",
					label: _("Statuses"),
					options: statusesArr
				},

				{
					view: "button",
					value: _("Save"),
					click: () => {
						const form = this.$$("form");
						if (!form.getValues().id) {
							contacts.add(form.getValues());
						} else {
							contacts.updateItem(form.getValues().id, form.getValues());
						}
						form.clear();
					}
				}
			],
			elementsConfig: {
				labelPosition: "top"
			}
		};
	}

	urlChange(view, url) {
		if (url[0].params.id) {
			this.$$("form").setValues(contacts.getItem(url[0].params.id));
		}
	}
}
