import { JetView } from "webix-jet";
import Contacts from "./contacts";
import Form from "./form";

export default class EditListView extends JetView {
	config() {
		return {
			cols: [
				{ $subview: Contacts, name: "contacts" },
				{ $subview: Form, name: "form" }
			]
		};
	}
}
