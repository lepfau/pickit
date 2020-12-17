require("dotenv").config();
require("./../config/mongo"); // fetch the db connection
const UserModel = require("../models/User");
const ItemModel = require("./../models/Item");
const CategoryModel = require("./../models/Category");

const items = [
  {
    name: "Tshirt",
    brand: "Tommy Hilfiger",
    description: "The perfect t-shirt",
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
    description: "Slinky slip dress for going out",
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
    description: "The coolest Nike kicks",
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
    name: "Blazer",
    brand: "H&M",
    description: "Classic black blazer for everyday wear",
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
  {
    name: "Sofabed",
    brand: "Habitat",
    description: "Beautiful sofa with a full-sized pullout bed",
    image:
      "https://cdn.habitat.fr/thumbnails/product/1097/1097829/box/1200/1200/80/fabric-3-seater-sofa-bed-grey_1097829.jpg",
    price: 1599,
    link: "https://www.habitat.eu/p/fabric-3-seater-sofa-bed-grey",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Ribbon Lamp",
    brand: "Habitat",
    description: "Modern design table lamp",
    image:
      "https://cdn.habitat.fr/thumbnails/product/1091/1091967/box/1200/1200/80/lampe-de-table-en-metal-noir-52-cm_1091967.jpg",
    price: 105,
    link: "https://www.habitat.fr/p/lampe-de-table-grand-modele-1",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Contrast Dress",
    brand: "Zara",
    description: "Slim fit midi dress",
    image:
      "https://static.zara.net/photos///2020/I/0/1/p/8758/517/701/2/w/1492/8758517701_1_1_1.jpg?ts=1608119394715",
    price: 49.95,
    link:
      "https://www.zara.com/fr/en/contrast-dress-p08758517.html?v1=88243215&v2=1549286",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Cashmere Polo Sweater",
    brand: "Zara",
    description: "Non-dyed beige cashmere wool sweater",
    image:
      "https://static.zara.net/photos///2020/I/0/2/p/3039/301/251/62/w/1492/3039301251_1_1_1.jpg?ts=1604573291829",
    price: 99,
    link:
      "https://www.zara.com/fr/en/cashmere-polo-collar-sweater-p03039301.html?v1=82075779&v2=1546882",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Projector",
    brand: "Philips",
    description: "Portable videoprojector for watchign movies anywhere",
    image:
      "https://image.darty.com/hifi_video/videoprojecteur-videoprojecteur/videoprojecteur_cinema/philips_neopix_prime_2_s2011264907094A_145018924.jpeg",
    price: 200,
    link:
      "https://www.darty.com/nav/achat/hifi_video/videoprojecteur-videoprojecteur/videoprojecteur_cinema/philips_neopix_prime_2.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "The Frame TV",
    brand: "Samsung",
    description: "Beautiful design TV that looks like art",
    image:
      "https://image.darty.com/hifi_video/tous_ecrans_plats/qled/samsung_qe43ls03_s2003054800265A_144224267.jpeg",
    price: 999,
    link:
      "https://www.darty.com/nav/achat/hifi_video/tous_ecrans_plats/qled/samsung_qe43ls03.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Home Cinema Projector",
    brand: "Xiomi",
    description: "Ultra HD projector for watching movies at home",
    image:
      "https://image.darty.com/hifi_video/videoprojecteur-videoprojecteur/videoprojecteur_cinema/xiaomi_miproj4k_n_s2010234875850A_093628021.jpeg",
    price: 2499,
    link:
      "https://www.darty.com/nav/achat/hifi_video/videoprojecteur-videoprojecteur/videoprojecteur_cinema/xiaomi_miproj4k_n.html#dartyclic=PL_B_0_4875850",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Tulip Table",
    brand: "Knoll",
    description: "Classic Eero Saarinen marble table ",
    image:
      "https://www.conranshop.fr/media/catalog/product/cache/8a394d7302b6f57bd505c0072f6cff11/4/3/430999_1be7.jpg",
    price: 9900,
    link:
      "https://www.conranshop.fr/saarinen-oval-244cm-arabescato-marble-white-base.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Wishbone chair",
    brand: "Cherner",
    description: "Wishbone chair made from one single piece of wood",
    image:
      "https://www.conranshop.fr/media/catalog/product/cache/8a394d7302b6f57bd505c0072f6cff11/6/1/617659_1_4_862f.jpg",
    price: 1368,
    link: "https://www.conranshop.fr/cherner-armchair-walnut.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Gioia Lamp",
    brand: "The Socialite Family",
    description: "Italian-designed table lamp",
    image:
      "https://media3.thesocialitefamily.com/fr/6267-thickbox_default/lampe-a-poser-gioia-bleu.jpg",
    price: 390,
    link:
      "https://shop.thesocialitefamily.com/fr/736-lampe-a-poser-gioia-bleu-3760329010056.html",
    user: [],
    likes: [],
    dislikes: [],
    category: [],
  },
  {
    name: "Cassette Sweater",
    brand: "Atelier Camille",
    description: "Alpaca sweater with fantasy detailing and ruffled collar",
    image: "https://www.ateliercamille.com/content/uploads/2020/12/MG_6354.jpg",
    price: 195,
    link:
      "https://www.ateliercamille.com/en/produit/pull-cassette-gris-chine/?attribute_pa_couleur=gris&attribute_pa_taille=0-34-36",
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
