const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const cloudinary = require('cloudinary')
const CustomError = require('../errors')
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils')
const { singleUpload, getDataUri } = require('../middleware/multer')
const { sendMail } = require('../utils/feature')

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users, success: true })
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) {
        throw new CustomError.NotFoundError(
            `No user with id : ${req.params.id}`
        )
    }
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({ user, success: true })
}

const showCurrentUser = async (req, res) => {
    const avatar = await User.findById({ _id: req.user.userId })
    res.status(StatusCodes.OK).json({
        user: req.user,
        success: true,
        avatar: avatar.avatar,
    })
}
// update user with user.save()
const updateUser = async (req, res) => {
    const { email, name, address, city, country, pincode } = req.body

    const user = await User.findOne({ _id: req.user.userId })

    if (email) {
        user.email = email
    }
    if (name) {
        user.name = name
    }
    if (address) {
        user.address = address
    }
    if (pincode) {
        user.pincode = pincode
    }
    if (country) {
        user.country = country
    }
    if (city) {
        user.city = city
    }

    await user.save()

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.OK).json({ user: tokenUser, success: true })
}
const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values')
    }
    const user = await User.findOne({ _id: req.user.userId })

    const isPasswordCorrect = await user.comparePasscode(oldPassword)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    user.password = newPassword

    await user.save()
    res.status(StatusCodes.OK).json({
        msg: 'Success! Password Updated.',
        success: true,
    })
}
const updatePicture = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })

    const file = getDataUri(req.file)
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    const myCloud = await cloudinary.v2.uploader.upload(file.content)
    user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }
    await user.save()

    res.status(StatusCodes.OK).json({
        msg: 'Success! Image Updated.',
        success: true,
    })
}

const forgetPassword = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new CustomError.NotFoundError(`No user with email : ${email}`)
    }

    const randomNumber = Math.random() * (999999 - 100000) + 100000

    const otp = Math.floor(randomNumber)
    const otp_expire = 15 * 60 * 1000

    user.otp = otp
    user.otp_expire = new Date(Date.now() + otp_expire)

    await user.save()
    const messsage = `Your OTP for re-setting password is ${otp}.\n Please ignore if you haven't requested this`

    try {
        await sendMail('OTP for resetting password', user.email, messsage)
    } catch (error) {
        user.otp = null
        user.otp_expire = new Date(Date.now + otp_expire)

        await user.save()
        return new CustomError.BadRequestError(error)
    }

    //send email

    res.status(StatusCodes.OK).json({
        message: 'Email sent successfully ',
        success: true,
    })
}

const resetPassword = async (req, res) => {
    const { otp, password } = req.body
    const user = await User.findOne({ otp, otp_expire: { $gt: Date.now() } })

    if (!user) {
        throw new CustomError.NotFoundError(
            `Incorrect OTP or OTP expired retry again `
        )
    }
    if (!password) {
        throw new CustomError.BadRequestError(`Please Enter new Password `)
    }

    user.password = password
    user.otp = undefined
    user.otp_expire = undefined

    await user.save()

    res.status(StatusCodes.OK).json({
        msg: 'Success! Password Updated.',
        success: true,
    })
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    updatePicture,
    forgetPassword,
    resetPassword,
}

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
