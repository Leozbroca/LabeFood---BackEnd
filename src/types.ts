interface TypeUser {
    [key:string]:string
}

export interface userInputDTO extends TypeUser {
    name:string,
    email:string,
    cpf:string,
    password:string
}

export interface authenticationData {
    id: string
}

export interface user extends userInputDTO{
    id:string
}

