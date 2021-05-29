var api_key = "11480d9c8e1454b35bf9279a7749fa1c-6ae2ecad-70890fe4";
var domain = "sandbox57949ce6cdec4045a3a2091f2f0d1e0b.mailgun.org";
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

var data = {
  from: "Avneet <avneetpandey82@gmail.com>",
  to: "avneetpandey82@gmail.com",
  subject: "Identification",
  text: "I am avneet pandey",
};

mailgun.messages().send(data, function (error, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});
