import axios from "axios";

class GetAddress {
  async getAdressByCep(cep:string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if(response.data.erro){
        throw new Error("Cep invalido")
      }
      return response.data

    } catch (error:any) {

    }
  };
}

export default new GetAddress()