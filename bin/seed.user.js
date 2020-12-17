require("dotenv").config();
require("./../config/mongo");

const UserModel = require("./../models/User");

const users = [
  {
    username: "echen",
    firstName: "Elisa",
    lastName: "Chen",
    email: "elisachen@gmail.com",
    password: "12345",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQFM5_4sPtea-w/profile-displayphoto-shrink_400_400/0/1586505029762?e=1613606400&v=beta&t=lNYbUcQC4uPtaeekkfcL9uDyjD4PH57OlvJ25tuU9Uw",
    items: [],
    friends: [],
  },
  {
    username: "kpavlova",
    firstName: "Kate",
    lastName: "Pavlova",
    email: "kpavlova@gmail.com",
    password: "56789",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQFnmlfM0ukSrQ/profile-displayphoto-shrink_400_400/0/1568296028108?e=1613606400&v=beta&t=jcxjp4TVHn_WCs6TkZ7HFPV8wPX9CxnrytizHhn443w",
    items: [],
    friends: [],
  },
  {
    username: "epfau",
    firstName: "Edouard",
    lastName: "Pfauwadel",
    email: "epfauwadel@gmail.com",
    password: "812892",
    image:
      "https://media-exp1.licdn.com/dms/image/C5103AQHnIR4V3lwpqw/profile-displayphoto-shrink_400_400/0/1517405982672?e=1613606400&v=beta&t=t0trh3ifUsUfQXAFpf3Vit9pn3bWPki6kS4q0hfonh8",
    items: [],
    friends: [],
  },
  {
    username: "tcruise",
    firstName: "Tom",
    lastName: "Cruise",
    email: "tcruise@gmail.com",
    password: "12345",
    image:
      "https://www.indiewire.com/wp-content/uploads/2020/12/AP_18204237578266.jpg?w=780",
    items: [],
    friends: [],
  },
  {
    username: "gclooney",
    firstName: "George",
    lastName: "Clooney",
    email: "gclooney@gmail.com",
    password: "812892",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/George_Clooney_2016.jpg",
    items: [],
    friends: [],
  },
  {
    username: "tswift",
    firstName: "Taylor",
    lastName: "Swift",
    email: "tswift@gmail.com",
    password: "812892",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Taylor_Swift_2_-_2019_by_Glenn_Francis_%28cropped%29_3.jpg",
    items: [],
    friends: [],
  },
  {
    username: "mstreep",
    firstName: "Meryl",
    lastName: "Streep",
    email: "mstreep@gmail.com",
    password: "812892",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Meryl_Streep_December_2018.jpg",
    items: [],
    friends: [],
  },
];

//empty database
UserModel.deleteMany()
  .then(async () => {
    //insert robots in db
    await UserModel.insertMany(users);
    console.log(`ok: ${users.length} users has been inserted`);
  })
  .catch((err) => {
    console.log(err);
  });
