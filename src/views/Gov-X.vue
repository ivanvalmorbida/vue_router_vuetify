<template>
  <div>
    <v-app
      ><!-- Barra superior -->
      <v-app-bar app color="#013D6E">
        <!-- Botão para expandir/esconder menu lateral esquerdo -->
        <span
          style="
            color: #ffffff;
            font-size: 45px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          "
          @click.stop="drawerEsquerdo = !drawerEsquerdo"
          class="mdi mdi-menu"
        ></span>
        <v-toolbar-title style="margin-left: 80px" class="white--text"
          >GOV | Gerenciamento de Opção de Vendas</v-toolbar-title
        >
        <!-- Ícone mdi-help -->
        <span
          style="
            color: #ffffff;
            font-size: 35px;
            position: absolute;
            right: 120px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          "
          @click="dialogAjuda = true"
          class="mdi mdi-help"
        ></span>
        <!-- Ícone mdi-apps -->
        <span
          style="
            color: #ffffff;
            font-size: 45px;
            position: absolute;
            right: 70px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          "
          class="mdi mdi-apps"
        ></span>
        <!-- Botão para expandir/esconder menu lateral direito -->
        <span
          style="
            color: #ffffff;
            font-size: 45px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          "
          @click.stop="drawerDireito = !drawerDireito"
          class="mdi mdi-menu"
        ></span>
      </v-app-bar>
      <!-- Menu lateral esquerdo -->
      <v-navigation-drawer
        v-model="drawerEsquerdo"
        style="background-color: #f0f3f4"
        app
      >
        <v-layout
          justify-center
          align-center
          @click="voltarTelaPrincipal"
          style="cursor: pointer"
        >
          <img
            src="../assets/icone-gov.png"
            style="margin-left: 50px; margin-top: 50px; width: 150px"
          />
        </v-layout>
        <v-list-item-group>
          <v-col v-if="mostrarBotoesOvFavoritosMenuEsquerdo">
            <v-btn
              color="#C2E7FF"
              class="black--text"
              style="width: 230px; height: 65px; margin-top: 40px"
            >
              <v-icon color="#000000" size="36" left
                >mdi mdi-currency-usd</v-icon
              >
              Minhas OVS [{{ this.pessoas.length }}]
            </v-btn>
            <v-btn
              color="#C2E7FF"
              class="black--text"
              style="width: 230px; height: 65px; margin-top: 25px"
            >
              <v-icon color="#000000" size="36" left>mdi mdi-star</v-icon>
              Favoritos [2]
            </v-btn>
          </v-col>
          <div
            v-if="mostrarBotoesAcoesMenuEsquerdo"
            style="
              display: flex;
              margin-top: 35px;
              justify-content: space-around;
            "
          >
            <div style="cursor: pointer">
              <v-icon
                size="34"
                color="black"
                :style="{
                  opacity: editarAtivado ? 1 : 0.3,
                }"
                >mdi-pencil</v-icon
              >
            </div>
            <div style="cursor: pointer">
              <v-icon
                size="34"
                color="black"
                :style="{
                  opacity: editarAtivado ? 1 : 0.3,
                }"
                >mdi-undo</v-icon
              >
            </div>
            <div style="cursor: pointer">
              <v-icon
                size="34"
                color="black"
                :style="{
                  opacity: editarAtivado ? 1 : 0.3,
                }"
                >mdi-content-save</v-icon
              >
            </div>
            <div style="cursor: pointer">
              <v-icon
                size="34"
                color="black"
                :style="{
                  opacity: editarAtivado ? 1 : 0.3,
                }"
                >mdi-email-check-outline</v-icon
              >
            </div>
            <div style="cursor: pointer">
              <v-icon
                size="34"
                color="black"
                :style="{
                  opacity: editarAtivado ? 1 : 0.3,
                }"
                >mdi-alarm</v-icon
              >
            </div>
          </div>
          <div style="margin-top: 25px">
            <div
              v-if="mostrarMenusEsquerdosParametros"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'facilidades'
                    ? '#D9D9D9'
                    : 'transparent',
              }"
              @click="abreFacilidades()"
            >
              <span class="custom-list-item-title">Facilidades</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosParametros"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'negociacao'
                    ? '#D9D9D9'
                    : 'transparent',
              }"
              @click="abreNegociacao('negociacao')"
            >
              <span class="custom-list-item-title">Negociação</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosParametros"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'cjto' ? '#D9D9D9' : 'transparent',
              }"
              @click="abreCjto('cjto')"
            >
              <span class="custom-list-item-title">CJTO</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosParametros"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'placa'
                    ? '#D9D9D9'
                    : 'transparent',
              }"
              @click="abrePlaca('placa')"
            >
              <span class="custom-list-item-title">Placa</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosParametros"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'feedback'
                    ? '#D9D9D9'
                    : 'transparent',
              }"
              @click="abreFeedback('feedback')"
            >
              <span class="custom-list-item-title">Feedback (RA)</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosParametros"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'ov' ? '#D9D9D9' : 'transparent',
              }"
              @click="abreOv('ov')"
            >
              <span class="custom-list-item-title">Validação OV</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosAnalises"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'variacaoPreco'
                    ? '#D9D9D9'
                    : 'transparent',
              }"
              @click="abreVariacaoPreco('variacaoPreco')"
            >
              <span class="custom-list-item-title">Variação de Preço</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosAnalises"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'facsOvs'
                    ? '#D9D9D9'
                    : 'transparent',
              }"
              @click="abreFacsOvs('facsOvs')"
            >
              <span class="custom-list-item-title">FAC'S/OV'S</span>
            </div>
            <div
              v-if="mostrarMenusEsquerdosAnalises"
              class="custom-list-item"
              :style="{
                backgroundColor:
                  menuLateralSelecionado === 'acessos'
                    ? '#D9D9D9'
                    : 'transparent',
              }"
              @click="abreAcessos('acessos')"
            >
              <span class="custom-list-item-title">Acessos</span>
            </div>
          </div>
        </v-list-item-group>
      </v-navigation-drawer>
      <v-main>
        <!-- Barra de Pesquisa -->
        <v-row v-if="mostrarTabela">
          <div>
            <v-text-field
              v-model="paramPesquisar"
              variant="outlined"
              label="PESQUISAR"
              style="
                margin-left: 70px;
                margin-top: 17px;
                width: 600px;
                height: 30px;
                line-height: 20px;
              "
              @keyup.enter="pesquisar(paramPesquisar)"
            >
              <template v-slot:prepend-inner>
                <v-icon @click="pesquisar(paramPesquisar)">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </div>
          <div style="margin-top: 25px; margin-left: 10px">
            <v-radio-group v-model="situacao" inline>
              <v-radio
                label="Vigentes"
                value="3"
                @click="setSituacao(3)"
              ></v-radio>
              <v-radio
                label="Não Validadas"
                value="7"
                @click="setSituacao(7)"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-row>
        <!-- Tabela de Pessoas -->
        <v-card-text
          v-if="mostrarTabela"
          class="table-container"
          style="
            margin: 60px;
            margin-top: 40px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: auto;
            max-width: 1700px;
          "
        >
          <v-data-table
            :headers="headers"
            :items="pessoas"
            :items-per-page="15"
            class="elevation-1"
            @click:row="carregar"
            items-per-page-text="Linhas por página"
          >
            <template v-slot:no-data>
              <div style="text-align: left">
                No campo busca pesquise por ID.
              </div>
            </template>

            <template v-slot:item.favorito="{ item }">
              <v-icon v-if="item.favorito === 1" @click="selecionaFavorito(1)"
                >mdi-star</v-icon
              >
              <v-icon v-else @click="selecionaFavorito(0)"
                >mdi-star-outline</v-icon
              >
            </template>

            <template v-slot:item.foto="{ item }" style="width: 15px">
              <div
                style="
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  position: relative;
                  overflow: hidden;
                "
              >
                <img
                  alt="Foto"
                  @load="imagemCarregada(item)"
                  @error="imagemNaoCarregada(item)"
                />
                <i
                  class="mdi mdi-account-circle"
                  style="
                    position: absolute;
                    font-size: 55px;
                    color: #e0e0e0;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                  "
                  v-if="!item.fotoCarregada"
                ></i>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
        <!-- Abas -->
        <v-card v-if="mostrarAbas">
          <v-tabs v-model="abas" align-tabs="center" color="#013D6E">
            <v-tab :value="1" class="class-abas" @click="abaSelecionada(1)"
              >Parâmetros</v-tab
            >
            <v-tab :value="2" class="class-abas" @click="abaSelecionada(2)"
              >Oportunidades</v-tab
            >
            <v-tab :value="3" class="class-abas" @click="abaSelecionada(3)"
              >Trocas</v-tab
            >
            <v-tab :value="4" class="class-abas" @click="abaSelecionada(4)"
              >Análises</v-tab
            >
            <v-tab :value="5" class="class-abas" @click="abaSelecionada(5)"
              >Timeline</v-tab
            >
          </v-tabs>
          <v-tabs-window v-model="abas">
            <v-tabs-window-item v-for="n in 5" :key="n" :value="n">
              <v-container fluid>
                <div v-if="n === 1 && menuLateralSelecionado === 'facilidades'">
                  <div
                    style="
                      margin: 25px;
                      color: #003d6e;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    <span>Facilidades</span>
                  </div>

                  <!-- Características -->
                  <v-container style="margin-left: 10px">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <div class="quadrado-foto"></div>
                        <v-col>
                          <div
                            style="
                              margin-bottom: 20px;
                              display: flex;
                              flex-direction: row;
                              align-items: center;
                            "
                          >
                            <div
                              style="
                                display: flex;
                                align-items: center;
                                margin-right: 20px;
                              "
                            >
                              <span
                                class="mdi mdi-home-city"
                                style="
                                  font-size: 30px;
                                  color: #003d6e;
                                  margin-right: 8px;
                                "
                              ></span>
                              <span
                                style="
                                  font-size: 20px;
                                  color: #003d6e;
                                  font-weight: bold;
                                "
                                >105.05m&sup2;</span
                              >
                            </div>
                            <div style="display: flex; align-items: center">
                              <span
                                class="mdi mdi-shower-head"
                                style="
                                  font-size: 30px;
                                  color: #003d6e;
                                  margin-right: 8px;
                                "
                              ></span>
                              <span
                                style="
                                  font-size: 20px;
                                  color: #003d6e;
                                  font-weight: bold;
                                "
                                >3</span
                              >
                            </div>
                          </div>
                        </v-col>
                        <div class="fontes-parametros">
                          <span>Características</span>
                        </div>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.valor"
                          hint="Valor"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <div
                          style="
                            margin-top: 30px;
                            margin-left: 10px;
                            display: flex;
                            align-items: center;
                          "
                        >
                          <span
                            class="mdi mdi-thumb-up"
                            style="
                              color: #47c032;
                              font-size: 28px;
                              margin-right: 8px;
                            "
                          ></span>
                          <span>Aceita troca</span>
                        </div>
                        <div
                          style="
                            margin-left: 10px;
                            margin-top: 30px;
                            display: flex;
                            align-items: center;
                          "
                        >
                          <span
                            class="mdi mdi-thumb-up"
                            style="
                              color: #47c032;
                              font-size: 28px;
                              margin-right: 8px;
                            "
                          ></span>
                          <span>Aceita financiamento</span>
                        </div>
                      </v-col>

                      <!-- Tipologia -->
                      <v-col cols="12" sm="4">
                        <div class="quadrado-foto"></div>
                        <v-col>
                          <div
                            style="
                              margin-bottom: 13px;
                              margin-top: -10px;
                              display: flex;
                              flex-direction: row;
                              align-items: center;
                            "
                          >
                            <div
                              style="
                                display: flex;
                                align-items: center;
                                margin-right: 20px;
                              "
                            >
                              <span
                                class="mdi mdi-bed-double"
                                style="
                                  font-size: 40px;
                                  color: #003d6e;
                                  margin-right: 5px;
                                "
                              ></span>
                              <span
                                style="
                                  font-size: 20px;
                                  color: #003d6e;
                                  font-weight: bold;
                                "
                                >3 + 1 Suíte</span
                              >
                            </div>
                            <div style="display: flex; align-items: center">
                              <span
                                class="mdi mdi-car"
                                style="
                                  font-size: 30px;
                                  color: #003d6e;
                                  margin-right: 8px;
                                "
                              ></span>
                              <span
                                style="
                                  font-size: 20px;
                                  color: #003d6e;
                                  font-weight: bold;
                                "
                                >3</span
                              >
                            </div>
                          </div>
                        </v-col>
                        <div class="fontes-parametros">
                          <span>Tipologia</span>
                        </div>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.tipoimovel"
                          hint="Tipo"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.subtipo"
                          hint="Sub-tipo 1"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.subtipo2"
                          hint="Sub-tipo 2"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.travessaodefentre"
                          hint="Travessão de Frente"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.lateraldeterreno"
                          hint="Lateral do terreno"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                      </v-col>

                      <!-- Localização -->
                      <v-col cols="12" sm="4">
                        <div class="quadrado-foto"></div>
                        <v-col>
                          <div
                            style="
                              margin-bottom: 19px;
                              display: flex;
                              flex-direction: row;
                              align-items: center;
                            "
                          >
                            <div
                              style="
                                display: flex;
                                align-items: center;
                                margin-top: 10px;
                              "
                            >
                              <v-btn
                                style="color: white; background-color: #003d6e"
                                >Prospecto</v-btn
                              >
                              <img
                                src="../assets/icone-diamante-premium.png"
                                alt="Descrição da Imagem"
                                style="
                                  width: 50px;
                                  height: auto;
                                  margin-left: 60px;
                                "
                              />
                            </div>
                          </div>
                        </v-col>
                        <div class="fontes-parametros">
                          <span>Localização</span>
                          <span
                            class="mdi mdi-map-marker"
                            style="font-size: 20px"
                          ></span>
                        </div>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.uf"
                          hint="UF"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.cidade"
                          hint="Cidade"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.bairro"
                          hint="Bairro"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.logr"
                          hint="Rua"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                        <v-text-field
                          class="margem-text-fields-parametros"
                          v-model="this.gov.d.numero"
                          hint="Número"
                          variant="underlined"
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
                <div v-if="n === 1 && menuLateralSelecionado === 'negociacao'">
                  <div
                    style="
                      margin: 25px;
                      color: #003d6e;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    <span>Negociação</span>
                  </div>

                  <v-text-field>Negociação </v-text-field>
                </div>
                <div v-if="n === 1 && menuLateralSelecionado === 'cjto'">
                  <div
                    style="
                      margin: 25px;
                      color: #003d6e;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    <span>CJTO</span>
                  </div>

                  <v-text-field>CJTO </v-text-field>
                </div>
                <div v-if="n === 1 && menuLateralSelecionado === 'placa'">
                  <div
                    style="
                      margin: 25px;
                      color: #003d6e;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    <span>Placa</span>
                  </div>

                  <v-text-field>Placa </v-text-field>
                </div>
                <div v-if="n === 1 && menuLateralSelecionado === 'feedback'">
                  <div
                    style="
                      margin: 25px;
                      color: #003d6e;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    <span>Feedback</span>
                  </div>

                  <v-text-field>Feedback </v-text-field>
                </div>
                <div v-if="n === 1 && menuLateralSelecionado === 'ov'">
                  <div
                    style="
                      margin: 25px;
                      color: #003d6e;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    <span>Negociação</span>
                  </div>

                  <v-text-field>Negociação </v-text-field>
                </div>
              </v-container>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import ws from "../ws/Mielinax";

export default {
  name: "App",
  data() {
    return {
      drawerEsquerdo: true,
      drawerDireito: false,
      mostrarMenusEsquerdosParametros: false,
      mostrarMenusEsquerdosAnalises: false,
      mostrarTabela: true,
      mostrarAbas: false,
      mostrarBotoesOvFavoritosMenuEsquerdo: true,
      mostrarBotoesAcoesMenuEsquerdo: false,
      menuLateralSelecionado: "",
      conteudoMenuFacilidades: "",
      editarAtivado: false,
      headers: [
        { title: "Foto", key: "foto" },
        { title: "Nome", key: "nome" },
        { title: "OV", key: "opvenda" },
        { title: "Favoritos", key: "favorito" },
        { title: "Valor", key: "valor" },
        { title: "Atualização", key: "edicao" },
        { title: "Feedback", key: "feedback" },
      ],
      pessoas: [],
      abas: null,
      gov: {
        chave: false,
        administrativo: true,
        opvenda: "",
        equipe: "",
        situacao: "",
        situacaoid: 1,
        tipoimovel: "",
        valor: 0,
        uf: "",
        cidade: "",
        bairro: "",
        exclusividade: 1,
        validade: "",
        vencimento: "",
        responsavel: 0,
        formapgto: "",
        posicaochave: 0,
        loteamento: "",
        quadra: "",
        lote: "",
        tipoconjunto: 0,
        comissao: 0,
        datacaptacao: "",
        estaaqui: false,
        desconto: 0,
        totpontuacao: 0,
        retirarplaca: false,
        placaprop: false,
        placaimob: false,
        placa: "",
        naoenviarcartas: true,
        naoeoportunidade: false,
        vigente: 1,
        venctoindeterminado: true,
        valoranterior: 0,
        proprietario: "",
        propostaativa: 0,
        foto: "",
        troca: 0,
        fotoci: "",
        midia3d: "",
      },
      paramPesquisar: "",
      situacao: null,
      favorito: null,
      itemsPerPageText: "teste",
    };
  },

  methods: {
    voltarTelaPrincipal() {
      this.mostrarBotoesOvFavoritosMenuEsquerdo = true;
      this.mostrarBotoesAcoesMenuEsquerdo = false;
      this.mostrarTabela = true;
      this.mostrarAbas = false;
      this.mostrarMenusEsquerdosParametros = false;
      this.mostrarMenusEsquerdosAnalises = false;
    },

    abreFacilidades() {
      this.menuLateralSelecionado = "facilidades";
    },

    abreNegociacao() {
      this.menuLateralSelecionado = "negociacao";
    },

    abreCjto() {
      this.menuLateralSelecionado = "cjto";
    },

    abrePlaca() {
      this.menuLateralSelecionado = "placa";
    },

    abreFeedback() {
      this.menuLateralSelecionado = "feedback";
    },

    abreOv() {
      this.menuLateralSelecionado = "ov";
    },

    abreVariacaoPreco() {
      this.menuLateralSelecionado = "variacaoPreco";
    },

    abreFacsOvs() {
      this.menuLateralSelecionado = "facsOvs";
    },

    abreAcessos() {
      this.menuLateralSelecionado = "acessos";
    },

    setSituacao(value) {
      this.situacao = value;
    },

    abaSelecionada(param) {
      switch (param) {
        case 1:
          this.mostrarMenusEsquerdosParametros = true;
          this.mostrarMenusEsquerdosAnalises = false;
          break;
        case 2:
          this.mostrarMenusEsquerdosParametros = false;
          this.mostrarMenusEsquerdosAnalises = false;
          break;
        case 3:
          this.mostrarMenusEsquerdosParametros = false;
          this.mostrarMenusEsquerdosAnalises = false;
          break;
        case 4:
          this.mostrarMenusEsquerdosParametros = false;
          this.mostrarMenusEsquerdosAnalises = true;
          break;
        case 5:
          this.mostrarMenusEsquerdosParametros = false;
          this.mostrarMenusEsquerdosAnalises = false;
          break;
      }
    },

    async selecionaFavorito(param) {
      console.log(param);
      //const favoritoResponse = await ws.favoritar(this.item.item.opvenda);
      //this.favorito = favoritoResponse;
    },

    async pesquisar(param) {
      try {
        const resposta = await ws.pesquisax(param, this.situacao);
        const resultado = JSON.parse(resposta.d);

        console.log(resultado);

        this.pessoas = resultado;
      } catch (error) {
        console.error("Erro ao pesquisar:", error);
      }
    },

    async carregar(event, item) {
      this.mostrarMenusEsquerdosParametros = true;
      this.mostrarMenusEsquerdosAnalises = false;
      this.mostrarBotoesOvFavoritosMenuEsquerdo = false;
      this.mostrarBotoesAcoesMenuEsquerdo = true;
      this.mostrarTabela = false;
      this.mostrarAbas = true;

      console.log("ITEM", item.item);

      var opVenda = item.item.opvenda;

      if (item != "") {
        this.ddi_oport = 1;
        this.oportunidades = [];
        this.ddici = [];
        this.alert = [];
        this.links = [];

        this.exp_panel = [-1];

        try {
          this.gov = await ws.carregarGov(opVenda);

          console.log("Gov:", this.gov.d.imovel);

          this.observacoes = await ws.carregarObs(this.gov.d.imovel);

          if (
            this.gov.d.posicaochave == 0 &&
            this.gov.d.chave &&
            this.gov.d.tipoimovel != "Terreno"
          )
            this.alert.push({
              info: "Chaves não identificadas",
            });
          if (this.gov.d.placa == "Autorizada e não colocada")
            this.alert.push({
              info: "Placa autorizada mas não colocada",
            });
          if (this.gov.d.placaprop == 1)
            this.alert.push({
              info: "Placa do proprietário",
            });

          this.links = await ws.carregarLinks(this.gov.d.opvenda);
          this.ultimas_alteracoes = await ws.carregarAlteracoesUsuario(
            this.gov.d.imovel
          );
          this.fin = await ws.carregarDadosFinanProprio(this.gov.d.opvenda);
          this.trocas = await ws.carregarTrocas(this.gov.d.opvenda);

          //this.Log("Exibiu GOV");

          console.log("GOV:", this.gov.d);
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      } else {
        if (this.gov.d.opvenda != "")
          alert("Você não pode fazer essa operação estando em edição!");
      }
    },
  },
};
</script>

<style scoped>
.menu-icon-left {
  color: #ffffff;
  font-size: 45px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.menu-icon-right {
  color: #ffffff;
  font-size: 45px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.v-navigation-drawer {
  transition: transform 0.3s ease;
}

.v-main {
  margin-top: 30px;
}

.custom-list-item-title {
  padding-left: 24px;
  font-weight: bold;
  color: black;
}

.custom-list-item {
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.class-abas {
  margin-right: 90px;
  color: "#003D6E";
  font-weight: bold;
  font-size: 16px;
}

.fontes-parametros {
  margin-bottom: 10px;
  margin-left: 10px;
  color: #003d6e;
  font-weight: bold;
  font-size: 20px;
}

.fontes-parametros span {
  margin-right: 10px;
}

.margem-text-fields-parametros {
  margin-left: 12px;
}

.quadrado-foto {
  width: 280px;
  height: 208px;
  background-color: #ccc;
  border-radius: 50px;
  margin-bottom: 20px;
}
</style>
