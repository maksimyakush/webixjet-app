import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class ContactsView extends JetView {
	config() {
		const contactsHeader = {
			template: "Contacts",
			type: "header",
			css: "webix_header app_header"
		};

		const contactsList = {
			view: "list",
			localId: "contacts:contactsList",
			layout: "y",
			scroll: "",
			type: {
				height: 100
			},
			select: true,
			template: `<div class='user'>
                    <img class='user__img' src='//unsplash.it/50/50'>
                    <div class="user__info">
                        <div>#name#</div>
                        <div>#email#</div>
                    </div>
                    <i class="webix_icon wxi-close"></i>
                </div>`
		};

		const contactsForm = {
			view: "form",
			localId: "contacts:contactsForm",
			autoheight: false,
			paddingX: 20,
			elements: [
				{ view: "text", label: "User Name" },
				{ view: "text", label: "Email" }
			],
			elementsConfig: {
				labelPosition: "top"
			}
		};

		return {
			css: "webix_shadow_medium",
			cols: [{ rows: [contactsHeader, contactsList] }, contactsForm]
		};
	}
	init(view) {
		view.queryView({ localId: "contacts:contactsList" }).parse(contacts);
	}
}
