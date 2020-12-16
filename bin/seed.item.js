require("dotenv").config();
require("./../config/mongo"); // fetch the db connection
const UserModel = require("../models/User");
const ItemModel = require("./../models/Item");
const CategoryModel = require("./../models/Category");

const items = [
  {
    name: "Tshirt",
    brand: "Tommy Hilfiger",
    description: "This is a Tshirt",
    image:
      "https://juniorcouture.com/images/tommy-hilfiger-boys-black-logo-t-shirt-p7381-27761_medium.jpg",
    price: 45,
    link: "",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
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
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Shoes",
    brand: "Nike",
    description: "These are shoes",
    image: "https://i8.amplience.net/i/jpl/jd_156841_a?qlt=92&w=750&h=531&v=1",
    price: 200,
    link:
      "https://www.global.jdsports.com/product/white-nike-air-force-1-low-womens/156841/?istCompanyId=d7964b0f-ef92-49e4-9bc0-0e04137e2cc0&istFeedId=f1067f40-0b48-4df7-a306-773ba81416bd&istItemId=iitlltptm&istBid=t&gclid=Cj0KCQiAzsz-BRCCARIsANotFgNtjJLNE_bHEZuPcAlEPLjfN3g12B6Ynz1Ej7Q3jUeLT_wlFTVARWkaAsG3EALw_wcB&gclsrc=aw.ds",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Balazer",
    brand: "H&M",
    description: "Super pretty blazer",
    image:
      "https://lp2.hm.com/hmgoepprod?set=source[/35/79/3579d4cdb84db6f7aafbf9e9f9280aa58b466bd2.jpg],origin[dam],category[ladies_blazerswaistcoats_blazers],type[DESCRIPTIVESTILLLIFE],res[y],hmver[1]&call=url[file:/product/main]",
    price: 40,
    link: "https://www2.hm.com/fr_fr/productpage.0781613006.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Egide Sweater",
    brand: "Sezane",
    description: "Cream fluffy sweater",
    image:
      "https://media.sezane.com/image/upload/c_fill,d_placeholder_dark.png,fl_progressive:semi,h_816,q_auto:best,w_582/zedxjjvugyhy5uywhci8.jpg",
    price: 95,
    link: "https://www.sezane.com/fr/product/gilet-egide/ecru",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Marcelle Dress",
    brand: "Sezane",
    description: "Black sparkly dress",
    image:
      "https://media.sezane.com/image/upload/c_fill,d_placeholder_dark.png,fl_progressive:semi,h_816,q_auto:best,w_582/y1xee4eiehozpfuiq658.jpg",
    price: 95,
    link: "https://www.sezane.com/fr/product/robe-marcelle/noir",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Cargo pants",
    brand: "H&M",
    description: "Men's pants with cargo pockets",
    image:
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6e%2F29%2F6e29512d44f076786945d5b732af5ae8237f8e3a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_trousers_joggers%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    price: 30,
    link: "https://www2.hm.com/fr_fr/productpage.0606395023.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Kyrie 7",
    brand: "Nike",
    description: "Basketball kicks",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e7634285-ad44-455e-83ab-bfcabfc72392/chaussure-de-basketball-kyrie-7-WTN4WG.jpg",
    price: 150,
    link:
      "https://www.nike.com/fr/t/chaussure-de-basketball-kyrie-7-WTN4WG/CQ9326-001",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "kid's puffer coat",
    brand: "H&M",
    description: "Pink puffer coat for kids",
    image:
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe8%2F71%2Fe8719ba5fe267658eca2bf67ee787cbd2449ba99.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bkids_girl8y_outdoor%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    price: 35,
    link: "https://www2.hm.com/fr_fr/productpage.0869297001.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
];

ItemModel.deleteMany()
  .then(async () => {
    const categories = await CategoryModel.find();
    const users = await UserModel.find();

    function getRandomCat() {
      return Math.floor(Math.random() * Math.floor(categories.length));
    }
    function getRandomUser() {
      return Math.floor(Math.random() * Math.floor(users.length));
    }

    for (let i = 0; i < items.length; i++) {
      items[i].user = [users[getRandomUser()]._id];
      items[i].category = categories[getRandomCat()]._id;
    }

    console.log(items);

    await ItemModel.insertMany(items);
    console.log(`ok: ${items.length} items have been inserted`);
  })
  .catch((err) => {
    console.log(err);
  });

//FROM FRANK
// usersInDb.forEach((user,i) => {
//   user.friends.push(usersInDb[i+1]._id);
//   user.save();
//  UserModel.findByIdAndUpdate(user._id, user)
// }
