require("dotenv").config();
require("./../config/mongo"); // fetch the db connection
const ItemModel = require("./../models/Item");

const items = [
  {
    name: "Tshirt",
    brand: "Tommy Hilfiger",
    description: "This is a Tshirt",
    image:
      "https://juniorcouture.com/images/tommy-hilfiger-boys-black-logo-t-shirt-p7381-27761_medium.jpg",
    price: 45,
    link: "",
    //user:"5fd3a16903baac1cb9ae77e0",
    // reaction:[],
    // category: []
  },
  {
    name: "Dress",
    brand: "Zara",
    description: "This is a Dress",
    image:
      "https://static.zarahome.net/8/photos4/2020/I/4/1/p/1023/121/401/1023121401_1_1_2.jpg?t=1583403314506",
    price: 80,
    link:
      "https://www.zarahome.com/ae/clothing-&-footwear/clothing/woman/tie-up-strap-nightdress-c1020286007p301743062.html?LGWCODE=4102312140102I2020;166187;8071&colorId=401&gclid=Cj0KCQiAzsz-BRCCARIsANotFgPRL83kfRSAHSua7j95sGWwQ5BsRQNFcAcOnExMaJ4l3dA3u25rse4aAtqNEALw_wcB",
    // user:"",
    //     reaction:[],
    //     category: []
  },
  {
    name: "Shoes",
    brand: "Nike",
    description: "These are shoes",
    image: "https://i8.amplience.net/i/jpl/jd_156841_a?qlt=92&w=750&h=531&v=1",
    price: 200,
    link:
      "https://www.global.jdsports.com/product/white-nike-air-force-1-low-womens/156841/?istCompanyId=d7964b0f-ef92-49e4-9bc0-0e04137e2cc0&istFeedId=f1067f40-0b48-4df7-a306-773ba81416bd&istItemId=iitlltptm&istBid=t&gclid=Cj0KCQiAzsz-BRCCARIsANotFgNtjJLNE_bHEZuPcAlEPLjfN3g12B6Ynz1Ej7Q3jUeLT_wlFTVARWkaAsG3EALw_wcB&gclsrc=aw.ds",
    //     user:"",
    //     reaction:[],
    //     category: []
  },
];

ItemModel.deleteMany()
  .then(async () => {
    //insert robots in db
    await ItemModel.insertMany(items);
    console.log(`ok: ${items.length} items has been inserted`);
  })
  .catch((err) => {
    console.log(err);
  });
