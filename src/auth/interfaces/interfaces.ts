export interface LoginData{
    email:string,
    password:string
}

export interface TokenPayload{
    name: string,
    role_slug: string
}

export interface TemplateBody{
    body: string,
    subject: string
}