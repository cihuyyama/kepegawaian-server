import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserPayload } from "../global";

export async function registerAuthMiddleware(app: FastifyInstance) {
    app.decorate(
        'authenticate',
        async (request: FastifyRequest, reply: FastifyReply) => {
            const token = request.cookies?.access_token
            const authHeader = request.headers.authorization
    
            if (!token && !authHeader) {
                return reply.status(401).send({ message: 'Authentication required' })
            }
    
            const jwtToken = token || authHeader?.split(' ')[1]
    
            if (!jwtToken) {
                return reply.status(401).send({ message: 'Invalid token' })
            }
    
            try {
                const decoded = request.jwt.verify(jwtToken) as UserPayload
                request.user = decoded
            } catch (e) {
                return reply.status(401).send({ message: 'Invalid or expired token' })
            }
    
        }
    );
    
    app.addHook('preHandler', (req, res, next) => {
        req.jwt = app.jwt
        next()
    })
}