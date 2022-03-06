import { user } from "../../types";
import { BaseDatabase } from "../BaseDatabase";

class UserData extends BaseDatabase{
    private static TABLE_NAME = "labefood_users";

    public async signup(user:user): Promise<void> {
        try {
          await this.getConnection()
            .insert({
              id:user.id,
              name:user.name,
              email:user.email,
              cpf:user.cpf,
              password:user.password
            })
            .into(UserData.TABLE_NAME);
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
    }

    public async login(email:string): Promise<any> {
        try {
            const user = await this.getConnection()
            .select()
            .from(UserData.TABLE_NAME)
            .where({ email });
       
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async editUser(id:string, user:any): Promise<void> {
        try {
            await this.getConnection()
            .update({
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                password: user.password
            })
            .from(UserData.TABLE_NAME)
            .where({ id });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async createAddress(address:any): Promise<void> {
        try {
          await this.getConnection()
            .insert({
              id:address.id,
              street:address.street,
              number:address.number,
              neighbourhood:address.neighbourhood,
              city:address.city,
              state:address.state,
              complement:address.complement,
              user_id: address.user_id
            })
            .into("labefood_user_address");
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
    }
}

export default new UserData()