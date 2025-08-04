import { FastifyReply, FastifyRequest } from "fastify"
import { ChangePasswordInput, CreateUserInput, LoginUserInput, UpdateUserInput, UpdateUserPhotoInput } from "./user.schema"
import UserService from "./user.service"
import { errorFilter } from "../../middlewares/error-handling"
import { Role } from "../../utils/types"
import { createReadStream } from "fs"

export async function registerUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput
    }>,
    reply: FastifyReply
) {
    try {
        const user = await UserService.Register(request.body)

        reply.send({
            data: user,
            message: "User created successfully",
            status: 201,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function loginUserHandler(
    request: FastifyRequest<{
        Body: LoginUserInput
    }>,
    reply: FastifyReply
) {
    try {
        const payload = await UserService.Login(request.body)

        const token = request.jwt.sign(
            {
                ...payload,
            },
            {
                expiresIn: 1000 * 60 * 60 * 24 * 7, // 7 days
            }
        )

        reply.setCookie("access_token", token, {
            path: "/",
            domain: process.env.DOMAIN || "localhost",
            httpOnly: true,
            secure: true,
        })

        reply.send({
            data: {
                access_token: token,
            },
            message: "User logged in successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function logoutUserHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const token = request.user.GoogleToken
    if (token) {
        await fetch('https://accounts.google.com/o/oauth2/revoke?token=' + token?.access_token, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token?.access_token
            },
        })
    }

    reply.clearCookie("google_access_token", {
        path: "/",
        domain: process.env.DOMAIN || "localhost",
        httpOnly: true,
        secure: true,
    });

    reply.clearCookie("access_token", {
        path: "/",
        domain: process.env.DOMAIN || "localhost",
        httpOnly: true,
        secure: true,
    });

    reply.send({
        data: [],
        message: "User logged out successfully",
        status: 200,
    })
}

export async function getAllUsersHandler(
    request: FastifyRequest<{
        Querystring: {
            username?: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { username } = request.query

        const users = await UserService.GetAllUsers(username)

        reply.send({
            data: users,
            message: "Users fetched successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function getAllUsersByKaprodiHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const userId = request.user.id

        const users = await UserService.GetAllUsersByKaprodi(userId)

        reply.send({
            data: users,
            message: "Users fetched successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function getUserByIdHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params

        const user = await UserService.GetUserById(id)

        reply.send({
            data: user,
            message: "User fetched successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}
export async function getUserByTokenHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        // if (request.user.role !== Role.ADMIN) {
        //     reply.status(403).send({
        //         message: "Forbidden",
        //         status: 403,
        //     })
        //     return
        // }


        const user = await UserService.GetUserById(request.user.id)

        reply.send({
            data: user,
            message: "User fetched successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function updateUserHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
        Body: UpdateUserInput
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params

        const user = await UserService.UpdateUser(id, request.body)

        reply.send({
            data: user,
            message: "User updated successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function updateUserPhotoHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        },
        Body: UpdateUserPhotoInput
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params

        const imageFile = await UserService.UpdateUserPhoto(id, request.body.image)

        reply.send({
            data: imageFile,
            message: "User photo updated successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function streamPhotoHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params

        const user = await UserService.GetUserById(id)

        if (!user.photoFile || !user.imgUrl) {
            reply
                .header("Content-Type", "image/png")
                .header("Content-Disposition", `inline; filename="blank-profile-picture-973460_1280.png"`);
            const notFoundImageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            return reply.redirect(notFoundImageUrl);
        }

        reply
            .header("Content-Type", user.photoFile.mimetype)
            .header("Content-Disposition", `inline; filename="${user.photoFile.originalName}"`)

        return reply.send(createReadStream(user.photoFile.path));
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function changePasswordHandler(
    request: FastifyRequest<{
        Body: ChangePasswordInput
    }>,
    reply: FastifyReply
) {
    try {
        const userId = request.user.id

        const user = await UserService.changePassword(
            userId,
            request.body.oldPassword,
            request.body.newPassword
        )

        reply.send({
            data: user,
            message: "User password changed successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function deleteUserHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params

        const user = await UserService.deleteUser(id)

        reply.send({
            data: user,
            message: "User deleted successfully",
            status: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}
