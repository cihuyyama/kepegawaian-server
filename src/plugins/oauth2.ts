import { FastifyInstance } from "fastify";
import oauth2 from "@fastify/oauth2";

export function registerGoogleOAuth2Provider(app: FastifyInstance) {
    app.register(oauth2, {
        name: 'GoogleOAuth2',
        scope: ['profile', 'email'],
        tags: ['OAuth2'],
        credentials: {
            client: {
                id: process.env.GOOGLE_CLIENT_ID || '',
                secret: process.env.GOOGLE_CLIENT_SECRET || '',
            },
            auth: oauth2.GOOGLE_CONFIGURATION
        },
        startRedirectPath: '/oauth2/google',
        callbackUri: `${process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : 'http://localhost:5000'}/oauth2/google/callback`,
        schema: {
            tags: ['OAuth2'],
            summary: "Login with Google",
        },
    })
}