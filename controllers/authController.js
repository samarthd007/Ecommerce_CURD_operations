const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
const cloudinary = require('cloudinary')
const { getDataUri } = require('../middleware/multer')

const register = async (req, res) => {
    const { email, name, password, address, country, pincode, city } = req.body

    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists')
    }

    let avatar = undefined

    //file
    if (req.file) {
        const file = getDataUri(req.file)
        const myCloud = await cloudinary.v2.uploader.upload(file.content)
        avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({
        email,
        name,
        password,
        address,
        country,
        pincode,
        city,
        role,
        avatar,
    })
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser, success: true })
}
const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError.BadRequestError(
            'Please provide email and password'
        )
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePasscode(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ user: tokenUser })
}
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

module.exports = {
    register,
    login,
    logout,
}
