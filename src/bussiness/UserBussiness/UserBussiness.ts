import hashManager from "../../service/hashManager";
import { user, userInputDTO } from "../../types";
import authenticator from "../../service/authenticator";
import generatorId from "../../service/generatorId";
import UserData from "../../data/UserData/UserData";
import getAddress from "../../service/getAddress";

class UserBussiness {
    async signup (input:userInputDTO){
        Object.keys(input).forEach(function(itemDoObjeto){
            if(!input[itemDoObjeto]){
                throw new Error(`tem um item vazio ${itemDoObjeto}`)
            }
        })

        const verification = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
        const ok = verification.exec(input.email)

        if(!ok){
            throw new Error(`email no formato incorreto`)
        }

        // verificar user

        const id: string = generatorId.generatedId();
        const password = hashManager.createHash(input.password)

        const user:user = {
            id: id,
            name: input.name,
            email: input.email,
            cpf: input.cpf,
            password: password
        }

        await UserData.signup(user)

        const token = authenticator.generateToken({ id })

        return token
    }

    async login (input:any){
        Object.keys(input).forEach(function(itemDoObjeto){
            if(!input[itemDoObjeto]){
                throw new Error(`Empty input: '${itemDoObjeto}'`)
            }
        })

        const [user] = await UserData.login(input.email);

        const passwordIsCorrect: boolean = user && hashManager.compareHash(input.password, user.password);

        if (!user) {
            throw new Error("User doesn't exist")
        }

        if (!passwordIsCorrect) {
            throw new Error("Incorrect password")
        }

        const token = authenticator.generateToken({ id: user.id })

        return token
    }

    async editUser (input:any, token:string){
        Object.keys(input).forEach(function(itemDoObjeto){
            if(!input[itemDoObjeto]){
                throw new Error(`Empty input: '${itemDoObjeto}'`)
            }
        })

        const password = hashManager.createHash(input.password)
        const authenticationData = authenticator.getTokenData(token);

        const user = {
            name:input.name,
            email:input.email,
            cpf:input.cpf,
            password:password
        }

        await UserData.editUser(authenticationData.id, user)
    }

    async createAddress (input:any, token:string){
        Object.keys(input).forEach(function(itemDoObjeto){
            if(!input[itemDoObjeto]){
                throw new Error(`Empty input: '${itemDoObjeto}'`)
            }
        })

        const authenticationData = authenticator.getTokenData(token);

        const {logradouro, bairro, localidade, uf} = await getAddress.getAdressByCep(input.cep)
        const id: string = generatorId.generatedId();

        const address = {
            id: id,
            street: logradouro,
            number: input.number,
            neighbourhood: bairro,
            city: localidade,
            state: uf,
            complement: input.complement,
            user_id: authenticationData.id
        }
        
        await UserData.createAddress(address)
    }

}

export default new UserBussiness()