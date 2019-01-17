export const countries = new webix.DataCollection({
	data: [
		{ "Short Name": "BY", "Full Name": "Belarus" },
		{ "Short Name": "RU", "Full Name": "Russia" },
		{ "Short Name": "BR", "Full Name": "Brasil" },
		{ "Short Name": "FR", "Full Name": "France" },
		{ "Short Name": "USA", "Full Name": "United States" },
		{ "Short Name": "EN", "Full Name": "England" }
	]
});

// { id:"data:countries", $subview : new CommonData(this.app,"", countries, ["name", "icon"])},

// constructor(app,name,data, columns){
// 		super(app,name);
// 		this._tdata = data;
//         this._columns = colunbs
// 	}
//     config(){
//         let cols = [];
//         columns.foreach((name, i){
//             cols.push({
//                 id:i,
//                 header:i,
//                 fillspace:!i,
//             })
//         })
//         cols.push({
//             template:"{common.trashIcon()}"
//         });

//         return {
//             view:"datatabke", column:cols, onClick:{
//                 "wxi-trash":fucntion(){
//                     this.remove(id)
//                 }
//             }
//         }

//     }
