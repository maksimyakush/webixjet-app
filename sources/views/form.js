import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import { statuses } from "../models/statuses";
import { countries } from "../models/countries";

export default class FormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const form = {
			view: "form",
			localId: "form",
			width: 300,
			autoheight: false,
			paddingX: 20,
			elements: [
				{
					view: "text",
					label: _("User Name"),
					name: "Name",
					labelPosition: "top"
				},
				{
					view: "text",
					label: _("Email"),
					name: "Email",
					labelPosition: "top"
				},
				{
					view: "combo",
					label: _("Country"),
					name: "Country",
					options: {
						body: {
							data: countries,
							template: obj => _(obj.Name)
						}
					}
				},
				{
					view: "combo",
					label: _("Status"),
					options: {
						body: {
							data: statuses,
							template: obj =>
								`<i class='webix_icon wxi-${obj["Icon"]}'></i>${_(obj.Name)}`
						}
					},
					name: "Status"
				},
				{
					view: "button",
					localId: "form:button",
					value: _("Save"),
					width: 150,
					align: "right",
					click() {
						contacts.updateItem(
							this.$scope.getParam("id"),
							this.getFormView().getValues()
						);
					}
				}
			]
		};
		return form;
	}

	init(view) {
		this.on(this.app, "contacts:afterselect", id => {
			if (contacts.exists(id)) {
				this.$$("form:button").enable();
				view.setValues(contacts.getItem(id));
				this.setParam("id", id, true);
			}
		});
		this.on(this.app, "contacts:afterdelete", () => {
			view.clear();
			this.$$("form:button").disable();
		});
	}
}
