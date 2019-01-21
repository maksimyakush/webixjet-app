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
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: value => value.includes("@") && value.length >= 5
			},
			elements: [
				{
					view: "text",
					label: _("User Name"),
					name: "Name",
					labelPosition: "top",
					invalidMessage: "Name can not be empty"
				},
				{
					view: "text",
					label: _("Email"),
					name: "Email",
					labelPosition: "top",
					invalidMessage: "Email should be consisted of @ and >4 letters"
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
						if (!this.getFormView().validate()) return;
						if (!contacts.exists(this.$scope.getParam("id"))) {
							contacts.add(this.getFormView().getValues());
							this.getFormView().clear();
						} else {
							contacts.updateItem(
								this.$scope.getParam("id"),
								this.getFormView().getValues()
							);
						}
						this.getFormView().clearValidation();
					}
				},
				{
					view: "button",
					value: "Unselect",
					click() {
						this.$scope.app.callEvent("contacts:unselect");
						this.$scope.setParam("id", "", true);
						this.getFormView().clear();
						this.$scope.$$("form:button").setValue("Add");
						this.getFormView().clearValidation();
					}
				}
			]
		};
		return form;
	}

	ready(view) {
		this.on(this.app, "contacts:afterselect", id => {
			if (contacts.exists(id)) {
				this.$$("form:button").setValue("Update");
				view.setValues(contacts.getItem(id));
				this.setParam("id", id, true);
			}
		});
	}

	init(view) {
		if (!contacts.count()) this.$$("form:button").setValue("Add");
		this.on(this.app, "contacts:afterdelete", () => {
			view.clear();
			this.$$("form:button").setValue("Add");
			this.setParam("id", "", true);
		});
	}
}
