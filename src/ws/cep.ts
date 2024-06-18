import axios from "axios";
import type {AxiosInstance} from "axios";

class cep {
    http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            headers: { "Content-Type": "application/json" },
        });

        this.http.interceptors.response.use((response) => {
            // TODO: adicionar outras validações para ter certeza de que a resposta foi uma página de login.
            if (response.status === 302) {
                document.dispatchEvent(new Event("logout"));
                throw new Error("Sessão expirada");
            }
            return response;
        });
    }

    async carregar_cep(co:string) {
        const { data } = await this.http.post("/mielinax/ws/cep.asmx/carregar_cep", {
            co,
        });
        return data.d;
    }

    async salvar(obj) {
        const { data } = await this.http.post("/mielinax/ws/cep.asmx/salvarx", {
            obj,
        });
        return data.d;
    }

    async apagar(c) {
        const { data } = await this.http.post("/mielinax/ws/cep.asmx/apagar", {
            c,
        });
        return JSON.parse(data.d);
    }
}

const ws_cep = new (cep);
export default ws_cep;
