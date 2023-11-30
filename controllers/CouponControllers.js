const nodemailer = require("nodemailer");
const { Coupon } = require("../models");
const {Register} = require("../models");
const {Event} = require("../models");


const generateCouponCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 8;
    let couponCode = "";
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        couponCode += characters[randomIndex];
    }
    return couponCode;
};

const sendCouponEmail = async (email, couponCode) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'anusha.lakkakula2022@gmail.com',
                pass: 'iutvtpzrnkkcfoqd'
            }
        });

        let mailOptions = {
            from: 'santarun2023.rcck@gmail.com',
            to: email,
            subject: 'Santa Run 2023 Coupon Code',
            text: `Your coupon code for free registration: ${couponCode}`,
        };
        let info = await transporter.sendMail(mailOptions)
        console.log('Email sent: ', info.messageId);
        return { success: true }

    } catch (error) {
        console.error("Error sending email: ", error)
        return { success: false, error: error.message }
    }

}

const validateAge = async (ageProof) => {
    try {
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
            tessedit_char_whitelist: '0123456789'
        });
        const { data: { text } } = await worker.recognize(ageProof);
        await worker.terminate();
        const age = parseInt(text);
        if (isNaN(age)) {
            throw new Error('Age not found or could not be extracted');
        }

        return age;

    } catch (error) {
        console.error("Error during age validation: ", error)
    }
}

const requestCoupon = async (req, res) => {
    try {

        const { email, age } = req.body;
        console.log(email, age)
        if (age > 65) {
            const couponCode = generateCouponCode();
            const coupon = await Coupon.create({ couponCode, isUsed:false })

            const emailResponse = await sendCouponEmail(email, couponCode)
            if (emailResponse.success) {
                return res.status(200).json({ couponCode: coupon.couponCode });
            }
            else {
                return res.status(500).json({ error: 'Failed to send coupon email' })
            }
        }
        else {
            return res.status(403).json({ error: "Not eligible for free registration" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const applyCoupon = async(req, res) => {
const { couponCode } = req.body;
try {
    const isValidCoupon = await Coupon.findOne({where: {couponCode: couponCode, isUsed:false}, order:[['createdAt', 'DESC']], LIMIT:1})
  
  console.log(isValidCoupon, "coupon")
  
    if(isValidCoupon){
        await Coupon.update({isUsed:true}, {where: {couponCode}})

    }
    else{
        return res.status(400).json({success:false})
    }

} catch (error) {
    console.error("Error validationg coupon code:", error)
    res.status(500).json({success:false});
}
}

const freeRegistration = async (req, res) => {
    try {
     const coupon = await Coupon.findOne({order:[['createdAt', 'DESC']], LIMIT:1})
     console.log(coupon,"coupon")
        if (!coupon) {
            throw new Error("Coupon code is not available for free registration");
        }
if(coupon){
    // const user = Register.create(req.body)
    // res.status(200).json(user);
    // console.log("User registerd with coupon")


    const { eventName, ...userData } = req.body; 

    const event = await Event.findOne({ where: { eventName } });
console.log(eventName, "eventName")
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const user = await Register.create({
      ...userData, 
      eventId: event.id,
    });
    res.status(200).json(user);
    console.log("User registered free...");
}

    } catch (err) {
        console.log(err);
        throw err;
    }
}


module.exports = {
    requestCoupon,
    freeRegistration,
    applyCoupon
};
