export interface LoginData{
    email:string,
    password:string
}

export interface TokenPayload{
    email:string,
    id: Number,
    name: string,
    role_slug: string,
}

export interface TemplateBody{
    body: string,
    subject: string
}