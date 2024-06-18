import axios from "axios";
import type { AxiosInstance } from "axios";

class Mielinax {
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

  async listaUf() {
    const { data } = await this.http.post<Uf[]>(
      "/mielinax/ws/uf.asmx/carregar",
      {}
    );
    return data;
  }

  async pesquisax(param, situacao) {
    const { data } = await this.http.post("/mielinax/ws/gov.asmx/pesquisax", {
      texto: param,
      situacao: situacao,
    });
    return data;
  }

  async carregarGov(v) {
    const { data } = await this.http.post(
      "/mielinax/ws/gov.asmx/carregar_gov",
      { ov: v }
    );
    return data;
  }

  async carregarObs(params) {
    const { data } = await this.http.post(
      "/mielinax/ws/gov.asmx/carregar_obs",
      { im: params }
    );
    return data;
  }

  async carregarLinks(ov) {
    const { data } = await this.http.post("/mielinax/ws/gov.asmx/links", {
      ov,
    });
    return JSON.parse(data.d);
  }

  async carregarAlteracoesUsuario(im) {
    const { data } = await this.http.post(
      "/mielinax/ws/gov.asmx/AlteracoesUsuario",
      { im }
    );
    return JSON.parse(data.d);
  }

  async carregarDadosFinanProprio(ov) {
    const { data } = await this.http.post(
      "/mielinax/ws/gov.asmx/DadosFinanProprio",
      { ov }
    );
    return data.d;
  }

  async carregarTrocas(ov) {
    const { data } = await this.http.post("/mielinax/ws/gov.asmx/trocas", {
      ov,
    });
    return data.d;
  }

  async favoritar(ov) {
    const { data } = await this.http.post("/mielinax/ws/gov.asmx/favoritar", {
      ov,
    });
    return data.d;
  }
}

const ws = new Mielinax();
export default ws;

export type Uf = {
  value: number;
  text: string;
  nome: string;
};
